const { Plugin, PluginSettingTab, Setting, Notice } = require('obsidian');

// Konfigurace tabulek pro sync
const SYNC_TABLES = {
  'akce': {
    tag: '#supabase-sync/akce',
    fields: ['nazev', 'datum', 'typ', 'stav', 'poznamky']
  },
  'pokoje': {
    tag: '#supabase-sync/pokoj',
    fields: ['cislo_pokoje', 'pocet_luzek', 'stav', 'poznamky']
  },
  'dotace': {
    tag: '#supabase-sync/dotace',
    fields: ['nazev', 'poskytovatel', 'deadline', 'stav', 'poznamky']
  },
  'partneri_dodavatele': {
    tag: '#supabase-sync/partner',
    fields: ['nazev', 'typ', 'telefon', 'email', 'hodnoceni', 'poznamky']
  },
  'opravy_udrzba': {
    tag: '#supabase-sync/oprava',
    fields: ['nazev', 'popis', 'priorita', 'stav', 'poznamky']
  },
  'vehicles': {
    tag: '#supabase-sync/vehicle',
    fields: ['brand', 'model', 'year', 'category', 'styl', 'engine_capacity_cc', 'power_hp', 'power_kw', 'fuel_type', 'cooling_type', 'gears', 'oil_type', 'tank_capacity', 'spz', 'vin', 'color', 'stk_until', 'pov_until', 'insurance_company', 'insurance_expiry', 'last_service_date', 'next_service_date', 'odometer_km', 'current_price_eur', 'day_price_czk', '1h_price_czk', '3h_price_czk', 'weekend_price_czk', 'notes', 'photo_url']
  }
};

module.exports = class SupabaseSyncPlugin extends Plugin {
  async onload() {
    console.log('Loading Supabase Sync plugin');

    // Načti nastavení
    await this.loadSettings();

    // Přidej ribbon ikonu (vlevo)
    this.addRibbonIcon('sync', 'Sync se Supabase', async () => {
      await this.syncAllNotes();
    });

    // Přidej command
    this.addCommand({
      id: 'sync-current-note',
      name: 'Synchronizovat aktuální poznámku',
      callback: async () => {
        const activeFile = this.app.workspace.getActiveFile();
        if (activeFile) {
          await this.syncNote(activeFile);
        } else {
          new Notice('Není otevřená žádná poznámka');
        }
      }
    });

    this.addCommand({
      id: 'sync-all-notes',
      name: 'Synchronizovat všechny poznámky',
      callback: async () => {
        await this.syncAllNotes();
      }
    });

    this.addCommand({
      id: 'pull-from-supabase',
      name: 'Stáhnout data ze Supabase',
      callback: async () => {
        await this.pullFromSupabase();
      }
    });

    // Auto-sync při uložení souboru (pokud je zapnutý)
    if (this.settings.autoSync) {
      this.registerEvent(
        this.app.vault.on('modify', async (file) => {
          if (file.extension === 'md') {
            await this.syncNote(file);
          }
        })
      );
    }

    // Přidej settings tab
    this.addSettingTab(new SupabaseSyncSettingTab(this.app, this));

    new Notice('Supabase Sync plugin načten');
  }

  onunload() {
    console.log('Unloading Supabase Sync plugin');
  }

  async loadSettings() {
    this.settings = Object.assign({
      supabaseUrl: '',
      supabaseKey: '',
      autoSync: false,
      syncOnStartup: false,
      debugMode: false
    }, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  // Hlavní funkce pro sync poznámky
  async syncNote(file) {
    if (!this.settings.supabaseUrl || !this.settings.supabaseKey) {
      new Notice('⚠️ Nejdřív nastavte Supabase URL a API Key v nastavení');
      return;
    }

    try {
      const content = await this.app.vault.read(file);
      const metadata = this.parseMetadata(content);

      // Zjisti, do které tabulky patří
      const tableInfo = this.detectTable(content);
      if (!tableInfo) {
        if (this.settings.debugMode) {
          console.log(`Soubor ${file.name} nemá sync tag, přeskakuji`);
        }
        return;
      }

      // Extrahuj data podle typu tabulky
      const data = this.extractData(content, metadata, tableInfo);

      // Ulož do Supabase
      const result = await this.upsertToSupabase(tableInfo.table, data, file.basename);

      if (result.success) {
        new Notice(`✅ ${file.basename} synchronizováno`);
        if (this.settings.debugMode) {
          console.log('Sync úspěšný:', result);
        }
      } else {
        new Notice(`❌ Chyba při synchronizaci: ${result.error}`);
      }

    } catch (error) {
      new Notice(`❌ Chyba: ${error.message}`);
      console.error('Sync error:', error);
    }
  }

  // Sync všech poznámek s tagem
  async syncAllNotes() {
    new Notice('🔄 Synchronizuji všechny poznámky...');

    const files = this.app.vault.getMarkdownFiles();
    let synced = 0;

    for (const file of files) {
      const content = await this.app.vault.read(file);
      const hasTag = Object.values(SYNC_TABLES).some(t => content.includes(t.tag));

      if (hasTag) {
        await this.syncNote(file);
        synced++;
      }
    }

    new Notice(`✅ Synchronizováno ${synced} poznámek`);
  }

  // Stáhnout data ze Supabase a vytvořit/aktualizovat poznámky
  async pullFromSupabase() {
    if (!this.settings.supabaseUrl || !this.settings.supabaseKey) {
      new Notice('⚠️ Nejdřív nastavte Supabase URL a API Key');
      return;
    }

    new Notice('⬇️ Stahuji data ze Supabase...');

    try {
      for (const [tableName, tableInfo] of Object.entries(SYNC_TABLES)) {
        const response = await fetch(
          `${this.settings.supabaseUrl}/rest/v1/${tableName}?select=*`,
          {
            headers: {
              'apikey': this.settings.supabaseKey,
              'Authorization': `Bearer ${this.settings.supabaseKey}`
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();

        // Pro každý záznam vytvoř/aktualizuj poznámku
        for (const row of data) {
          await this.createOrUpdateNote(tableName, row, tableInfo);
        }

        new Notice(`✅ Staženo ${data.length} záznamů z tabulky ${tableName}`);
      }

    } catch (error) {
      new Notice(`❌ Chyba při stahování: ${error.message}`);
      console.error('Pull error:', error);
    }
  }

  // Vytvoř nebo aktualizuj poznámku z Supabase dat
  async createOrUpdateNote(tableName, data, tableInfo) {
    const folderPath = `Supabase/${tableName}`;

    // Vytvoř složku, pokud neexistuje
    if (!this.app.vault.getAbstractFileByPath(folderPath)) {
      await this.app.vault.createFolder(folderPath);
    }

    // Název souboru podle ID nebo názvu
    const fileName = `${data.nazev || data.id}.md`;
    const filePath = `${folderPath}/${fileName}`;

    // Vytvoř obsah poznámky
    const content = this.generateNoteContent(tableName, data, tableInfo);

    // Zjisti, zda soubor existuje
    const existingFile = this.app.vault.getAbstractFileByPath(filePath);

    if (existingFile) {
      await this.app.vault.modify(existingFile, content);
    } else {
      await this.app.vault.create(filePath, content);
    }
  }

  // Generuj obsah poznámky z Supabase dat
  generateNoteContent(tableName, data, tableInfo) {
    let content = '---\n';
    content += `supabase_id: ${data.id}\n`;
    content += `supabase_table: ${tableName}\n`;
    content += `last_sync: ${new Date().toISOString()}\n`;

    // Přidej pole do frontmatter
    if (tableName === 'vehicles') {
      if (data.brand) content += `brand: ${data.brand}\n`;
      if (data.model) content += `model: ${data.model}\n`;
      if (data.year) content += `year: ${data.year}\n`;
      if (data.category) content += `category: ${data.category}\n`;
      if (data.styl) content += `styl: ${data.styl}\n`;
      if (data.spz) content += `spz: ${data.spz}\n`;
      if (data.vin) content += `vin: ${data.vin}\n`;
      if (data.color) content += `color: ${data.color}\n`;
    }

    content += '---\n\n';
    content += `${tableInfo.tag}\n\n`;

    // Název podle typu tabulky
    let title = 'Bez názvu';
    if (tableName === 'vehicles') {
      title = `${data.brand || ''} ${data.model || ''}`.trim() || 'Vozidlo';
    } else {
      title = data.nazev || 'Bez názvu';
    }
    content += `# ${title}\n\n`;

    // Přidej všechna pole
    for (const field of tableInfo.fields) {
      if (data[field] !== undefined && data[field] !== null && field !== 'nazev' && field !== 'brand' && field !== 'model') {
        const label = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        content += `**${label}**: ${data[field]}\n`;
      }
    }

    // Fotka na konci
    if (data.photo_url) {
      content += `\n## Fotka\n![Fotka vozidla](${data.photo_url})\n`;
    }

    return content;
  }

  // Zjisti, do které tabulky poznámka patří
  detectTable(content) {
    for (const [tableName, info] of Object.entries(SYNC_TABLES)) {
      if (content.includes(info.tag)) {
        return { table: tableName, ...info };
      }
    }
    return null;
  }

  // Parsuj YAML frontmatter
  parseMetadata(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};

    const yaml = match[1];
    const metadata = {};

    yaml.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        metadata[key.trim()] = valueParts.join(':').trim();
      }
    });

    return metadata;
  }

  // Extrahuj data z poznámky
  extractData(content, metadata, tableInfo) {
    const data = {};

    // Název ze záhlaví nebo metadata
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      data.nazev = titleMatch[1].trim();
    }

    // Pole z frontmatter
    for (const field of tableInfo.fields) {
      if (metadata[field]) {
        data[field] = metadata[field];
      }
    }

    // Speciální parsování podle typu
    if (tableInfo.table === 'akce') {
      // Datum
      const datumMatch = content.match(/datum:\s*(\d{4}-\d{2}-\d{2})/i) ||
                         content.match(/\*\*datum\*\*:\s*(\d{4}-\d{2}-\d{2})/i);
      if (datumMatch) data.datum = datumMatch[1];

      // Typ
      const typMatch = content.match(/typ:\s*(\w+)/i) ||
                       content.match(/\*\*typ\*\*:\s*(\w+)/i);
      if (typMatch) data.typ = typMatch[1];

      // Stav
      const stavMatch = content.match(/stav:\s*(\w+)/i) ||
                        content.match(/\*\*stav\*\*:\s*(\w+)/i);
      if (stavMatch) data.stav = stavMatch[1];
    }

    if (tableInfo.table === 'pokoje') {
      // Číslo pokoje
      const cisloMatch = content.match(/cislo[_\s]pokoje:\s*(\d+)/i) ||
                         content.match(/\*\*cislo[_\s]pokoje\*\*:\s*(\d+)/i) ||
                         content.match(/pokoj[_\s](\d+)/i);
      if (cisloMatch) data.cislo_pokoje = parseInt(cisloMatch[1]);

      // Počet lůžek
      const luzkaMatch = content.match(/pocet[_\s]luzek:\s*(\d+)/i) ||
                         content.match(/\*\*pocet[_\s]luzek\*\*:\s*(\d+)/i);
      if (luzkaMatch) data.pocet_luzek = parseInt(luzkaMatch[1]);

      // Stav
      const stavMatch = content.match(/stav:\s*(\w+)/i);
      if (stavMatch) data.stav = stavMatch[1];
    }

    if (tableInfo.table === 'dotace') {
      // Deadline
      const deadlineMatch = content.match(/deadline:\s*(\d{4}-\d{2}-\d{2})/i);
      if (deadlineMatch) data.deadline = deadlineMatch[1];

      // Poskytovatel
      const posMatch = content.match(/poskytovatel:\s*(.+)/i);
      if (posMatch) data.poskytovatel = posMatch[1].trim();
    }

    if (tableInfo.table === 'partneri_dodavatele') {
      // Telefon
      const telMatch = content.match(/telefon:\s*([\+\d\s]+)/i);
      if (telMatch) data.telefon = telMatch[1].trim();

      // Email
      const emailMatch = content.match(/email:\s*([\w\.\-@]+)/i);
      if (emailMatch) data.email = emailMatch[1].trim();

      // Hodnocení
      const hodMatch = content.match(/hodnoceni:\s*(\d+)/i) ||
                       content.match(/★+/g);
      if (hodMatch) {
        data.hodnoceni = typeof hodMatch === 'string' ?
                         hodMatch.length : parseInt(hodMatch[1]);
      }
    }

    if (tableInfo.table === 'opravy_udrzba') {
      // Popis
      const popisMatch = content.match(/popis:\s*(.+)/i) ||
                         content.match(/\*\*popis\*\*:\s*(.+)/i);
      if (popisMatch) data.popis = popisMatch[1].trim();

      // Priorita
      const priorMatch = content.match(/priorita:\s*(\w+)/i);
      if (priorMatch) data.priorita = priorMatch[1];

      // Stav
      const stavMatch = content.match(/stav:\s*(\w+)/i);
      if (stavMatch) data.stav = stavMatch[1];
    }

    if (tableInfo.table === 'vehicles') {
      // Brand
      const brandMatch = content.match(/brand:\s*(.+)/i) ||
                        content.match(/\*\*brand\*\*:\s*(.+)/i) ||
                        content.match(/značka:\s*(.+)/i);
      if (brandMatch) data.brand = brandMatch[1].trim();

      // Model
      const modelMatch = content.match(/model:\s*(.+)/i) ||
                         content.match(/\*\*model\*\*:\s*(.+)/i);
      if (modelMatch) data.model = modelMatch[1].trim();

      // Year
      const yearMatch = content.match(/year:\s*(\d{4})/i) ||
                        content.match(/rok:\s*(\d{4})/i);
      if (yearMatch) data.year = parseInt(yearMatch[1]);

      // Category
      const categoryMatch = content.match(/category:\s*(\w+)/i) ||
                           content.match(/\*\*category\*\*:\s*(\w+)/i);
      if (categoryMatch) data.category = categoryMatch[1];

      // Styl
      const stylMatch = content.match(/styl:\s*(.+)/i) ||
                        content.match(/\*\*styl\*\*:\s*(.+)/i);
      if (stylMatch) data.styl = stylMatch[1].trim();

      // SPZ
      const spzMatch = content.match(/spz:\s*(.+)/i) ||
                       content.match(/\*\*spz\*\*:\s*(.+)/i);
      if (spzMatch) data.spz = spzMatch[1].trim();

      // VIN
      const vinMatch = content.match(/vin:\s*(.+)/i) ||
                       content.match(/\*\*vin\*\*:\s*(.+)/i);
      if (vinMatch) data.vin = vinMatch[1].trim();

      // Color
      const colorMatch = content.match(/color:\s*(.+)/i) ||
                         content.match(/\*\*color\*\*:\s*(.+)/i) ||
                         content.match(/barva:\s*(.+)/i);
      if (colorMatch) data.color = colorMatch[1].trim();

      // Engine capacity
      const ccMatch = content.match(/engine[_\s]capacity[_\s]cc:\s*(\d+)/i) ||
                      content.match(/objem:\s*(\d+)/i);
      if (ccMatch) data.engine_capacity_cc = parseInt(ccMatch[1]);

      // Power HP
      const hpMatch = content.match(/power[_\s]hp:\s*([\d.]+)/i) ||
                      content.match(/(\d+)\s*hp/i);
      if (hpMatch) data.power_hp = parseFloat(hpMatch[1]);

      // Power KW
      const kwMatch = content.match(/power[_\s]kw:\s*([\d.]+)/i) ||
                      content.match(/(\d+)\s*kw/i);
      if (kwMatch) data.power_kw = parseFloat(kwMatch[1]);

      // Fuel type
      const fuelMatch = content.match(/fuel[_\s]type:\s*(.+)/i) ||
                        content.match(/palivo:\s*(.+)/i);
      if (fuelMatch) data.fuel_type = fuelMatch[1].trim();

      // STK until
      const stkMatch = content.match(/stk[_\s]until:\s*(\d{4}-\d{2}-\d{2})/i);
      if (stkMatch) data.stk_until = stkMatch[1];

      // Notes
      const notesMatch = content.match(/notes:\s*(.+)/i) ||
                         content.match(/\*\*notes\*\*:\s*(.+)/i) ||
                         content.match(/poznámky:\s*(.+)/i);
      if (notesMatch) data.notes = notesMatch[1].trim();
    }

    // Poznámky - celý obsah bez frontmatter a tagů
    const bodyContent = content
      .replace(/^---[\s\S]*?---\n/, '')
      .replace(/#supabase-sync\/\w+\n/, '')
      .replace(/^#\s+.+\n/, '')
      .trim();

    if (bodyContent && !data.poznamky) {
      data.poznamky = bodyContent.substring(0, 500); // Limit 500 znaků
    }

    return data;
  }

  // Ulož do Supabase (upsert)
  async upsertToSupabase(tableName, data, noteName) {
    try {
      // Určit klíč pro vyhledání existujícího záznamu
      let searchKey = 'nazev';
      let searchValue = data.nazev || noteName;

      if (tableName === 'vehicles') {
        // Pro vehicles použij kombinaci brand + model nebo supabase_id
        if (data.brand && data.model) {
          searchKey = 'brand,model';
          searchValue = data.brand;
          const checkResponse = await fetch(
            `${this.settings.supabaseUrl}/rest/v1/${tableName}?brand=eq.${encodeURIComponent(data.brand)}&model=eq.${encodeURIComponent(data.model)}&select=id`,
            {
              headers: {
                'apikey': this.settings.supabaseKey,
                'Authorization': `Bearer ${this.settings.supabaseKey}`
              }
            }
          );
          const existing = await checkResponse.json();

          let response;
          if (existing && existing.length > 0) {
            // UPDATE existing vehicle
            response = await fetch(
              `${this.settings.supabaseUrl}/rest/v1/${tableName}?id=eq.${existing[0].id}`,
              {
                method: 'PATCH',
                headers: {
                  'apikey': this.settings.supabaseKey,
                  'Authorization': `Bearer ${this.settings.supabaseKey}`,
                  'Content-Type': 'application/json',
                  'Prefer': 'return=representation'
                },
                body: JSON.stringify(data)
              }
            );
          } else {
            // INSERT new vehicle
            response = await fetch(
              `${this.settings.supabaseUrl}/rest/v1/${tableName}`,
              {
                method: 'POST',
                headers: {
                  'apikey': this.settings.supabaseKey,
                  'Authorization': `Bearer ${this.settings.supabaseKey}`,
                  'Content-Type': 'application/json',
                  'Prefer': 'return=representation'
                },
                body: JSON.stringify(data)
              }
            );
          }

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
          }

          const result = await response.json();
          return { success: true, data: result };
        }
      }

      // Pro ostatní tabulky - původní logika
      const checkResponse = await fetch(
        `${this.settings.supabaseUrl}/rest/v1/${tableName}?nazev=eq.${encodeURIComponent(searchValue)}&select=id`,
        {
          headers: {
            'apikey': this.settings.supabaseKey,
            'Authorization': `Bearer ${this.settings.supabaseKey}`
          }
        }
      );

      const existing = await checkResponse.json();

      let response;
      if (existing && existing.length > 0) {
        // UPDATE
        response = await fetch(
          `${this.settings.supabaseUrl}/rest/v1/${tableName}?id=eq.${existing[0].id}`,
          {
            method: 'PATCH',
            headers: {
              'apikey': this.settings.supabaseKey,
              'Authorization': `Bearer ${this.settings.supabaseKey}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=representation'
            },
            body: JSON.stringify(data)
          }
        );
      } else {
        // INSERT
        response = await fetch(
          `${this.settings.supabaseUrl}/rest/v1/${tableName}`,
          {
            method: 'POST',
            headers: {
              'apikey': this.settings.supabaseKey,
              'Authorization': `Bearer ${this.settings.supabaseKey}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=representation'
            },
            body: JSON.stringify(data)
          }
        );
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      return { success: true, data: result };

    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Settings Tab
class SupabaseSyncSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Supabase Sync - Nastavení' });

    // Návod
    containerEl.createEl('p', {
      text: 'Pro synchronizaci s Supabase vyplňte URL a API key vašeho projektu.'
    });

    containerEl.createEl('a', {
      text: '📖 Jak získat Supabase credentials',
      href: 'https://supabase.com/dashboard'
    });

    containerEl.createEl('br');
    containerEl.createEl('br');

    // Supabase URL
    new Setting(containerEl)
      .setName('Supabase URL')
      .setDesc('URL vašeho Supabase projektu (např. https://xxxxx.supabase.co)')
      .addText(text => text
        .setPlaceholder('https://xxxxx.supabase.co')
        .setValue(this.plugin.settings.supabaseUrl)
        .onChange(async (value) => {
          this.plugin.settings.supabaseUrl = value;
          await this.plugin.saveSettings();
        }));

    // Supabase API Key
    new Setting(containerEl)
      .setName('Supabase API Key')
      .setDesc('Anon/Public API key (ne Service Role key!)')
      .addText(text => {
        text.inputEl.type = 'password';
        text
          .setPlaceholder('eyJhbGci...')
          .setValue(this.plugin.settings.supabaseKey)
          .onChange(async (value) => {
            this.plugin.settings.supabaseKey = value;
            await this.plugin.saveSettings();
          });
      });

    // Auto-sync
    new Setting(containerEl)
      .setName('Automatická synchronizace')
      .setDesc('Synchronizovat poznámku automaticky při uložení')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.autoSync)
        .onChange(async (value) => {
          this.plugin.settings.autoSync = value;
          await this.plugin.saveSettings();
          new Notice(`Auto-sync ${value ? 'zapnutý' : 'vypnutý'}`);
        }));

    // Debug mode
    new Setting(containerEl)
      .setName('Debug režim')
      .setDesc('Zobrazovat detailní logy v konzoli (F12)')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.debugMode)
        .onChange(async (value) => {
          this.plugin.settings.debugMode = value;
          await this.plugin.saveSettings();
        }));

    // Test připojení
    new Setting(containerEl)
      .setName('Test připojení')
      .setDesc('Otestovat připojení k Supabase')
      .addButton(button => button
        .setButtonText('Test')
        .onClick(async () => {
          await this.testConnection();
        }));

    // Dokumentace
    containerEl.createEl('br');
    containerEl.createEl('h3', { text: 'Podporované tagy:' });
    const tagList = containerEl.createEl('ul');

    for (const [table, info] of Object.entries(SYNC_TABLES)) {
      const li = tagList.createEl('li');
      li.createEl('code', { text: info.tag });
      li.createEl('span', { text: ` → tabulka: ${table}` });
    }

    containerEl.createEl('br');
    containerEl.createEl('h3', { text: 'Jak používat:' });
    const howTo = containerEl.createEl('ol');
    howTo.createEl('li', { text: 'Přidejte do poznámky jeden z tagů výše' });
    howTo.createEl('li', { text: 'Vyplňte pole v poznámce (např. datum: 2025-07-15)' });
    howTo.createEl('li', { text: 'Klikněte na sync ikonu nebo použijte command palette (Ctrl+P)' });
    howTo.createEl('li', { text: 'Data se automaticky synchronizují do Supabase' });
  }

  async testConnection() {
    if (!this.plugin.settings.supabaseUrl || !this.plugin.settings.supabaseKey) {
      new Notice('⚠️ Nejdřív vyplňte URL a API Key');
      return;
    }

    try {
      new Notice('🔄 Testuji připojení...');

      const response = await fetch(
        `${this.plugin.settings.supabaseUrl}/rest/v1/pokoje?limit=1`,
        {
          headers: {
            'apikey': this.plugin.settings.supabaseKey,
            'Authorization': `Bearer ${this.plugin.settings.supabaseKey}`
          }
        }
      );

      if (response.ok) {
        new Notice('✅ Připojení úspěšné!');
      } else {
        const error = await response.text();
        new Notice(`❌ Chyba: ${response.status} - ${error}`);
      }
    } catch (error) {
      new Notice(`❌ Chyba připojení: ${error.message}`);
    }
  }
}

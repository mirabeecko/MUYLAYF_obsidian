# wedos SSL + DNS

»05:52:09 Miroslav Přibyl: Dobrý den, jak Vám mohu pomoci?
»05:52:11 David Vinkler: zdravim, chtěl bych aktivovat zabezpečení ssl pro všechny domény v hostingu suprtisk.cz
»05:52:58 Miroslav Přibyl: Máte možnost si aktivovat certifikát Let's encrypt zdarma.

Návod na přidání domén do certifikátu naleznete zde: https://kb.wedos.com/a/708/nastaveni-domen-pro-lets-encrypt-certifikat.html
»06:05:17 Miroslav Přibyl: Mohu Vám ještě nějak pomoci?
»06:13:13 David Vinkler: mám problém s doménou kalendare-diare.cz .. byla u jiného wedos hostingu, vytvořil jsem alias ale stejně to nejede.
»06:16:43 Miroslav Přibyl: U domény jste nastavil naše DNS servery 7.1.2018 ve 23:20.

Je potřeba vyčkat. Změna se projeví do 24 hodin.

U domény nastavte DNS záznamy na webhosting zde:

https://client.wedos.com/dns/rows.html?id=552899

Nastavte tyto DNS záznamy:

Nebo můžete u registrátora domény nastavit DNS záznamy:
A 89.221.213.18
\* A 89.221.213.18

Pokud chcete využívat e-maily na webhostingu, nastavte tyto MX záznamy:

číslo před adresou je priorita.

1 wes1-mx1.wedos.net
1 wes1-mx2.wedos.net
10 wes1-mx-backup.wedos.net
»06:17:18 David Vinkler: mám zaplacenou službu HTTPS na doméně (SNI) - s vlastním certifikátem a klíčem. mám tedy dát předposlední možnost nebo tu poslední viz zaslaný odkaz
»06:18:03 Miroslav Přibyl: Pokud máte vlastní certifikát, tak tu předposlední možnost, kde vložíte Váš zakoupený certifikát.
»06:19:53 David Vinkler: pokud tedy nemám vlastní certifikát tak tu službu ani nepotřebuji, je to tak ?
»06:21:19 Miroslav Přibyl: Pokud nemáte vlastní certifikát, tak si u nás můžete zdarma aktivovat certifikát Let's encrypt (poslední možnost)

Pro aktivní https na webhostingu je potřeba mít akt

#claude_reference

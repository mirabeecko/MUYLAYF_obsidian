# DNS z RELAXnaWEDOS

»11:07:39 Jaromir Pekarek: děkuji, a jak to potom spustím ?
»11:08:50 Petr Ambrož: Máte dvě možnosti jak směrovat doménu na webhosting u nás, až budete chtít doménu směrovat k nám, tak nastavíte:
1) doméně nastavíte naše DNS servery:
ns.wedos.net
ns.wedos.eu
ns.wedos.cz
ns.wedos.com
Změna DNS serverů se projeví za 6-24 hodin (u generických doména jako je například .com se změna projeví až do 48 hodin.)
2) doméně nastavíte DNS záznamy u poskytovatele DNS serverů. Nastavíte si A záznam (AAAA - pro IPv6 adresu) u svého správce DNS na IP adresu webhostingu. Popřípadě MX záznam pro emaily.
IP adresy se dozvíte v zákaznické administraci v detailu konkrétního webhostingu v tabulce "Adresy služeb".
Změna záznamů DNS se projeví do 60-ti minut.
název: TTL:1800 typ:A data: "IPv4"
název: TTL:1800 typ:AAAA data: "IPv6"
název:\* TTL:1800 typ:A data: "IPv4"
název:\* TTL:1800 typ:AAAA data: "IPv6"
název: TTL:1800 typ:MX data:1 wes1-mx1.wedos.net
název: TTL:1800 typ:MX data:1 wes1-mx2.wedos.net

#claude_reference

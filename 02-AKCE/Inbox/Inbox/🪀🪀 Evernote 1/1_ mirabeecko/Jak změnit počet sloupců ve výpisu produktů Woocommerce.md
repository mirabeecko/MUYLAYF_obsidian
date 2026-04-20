# Jak změnit počet sloupců ve výpisu produktů Woocommerce

# Jak změnit počet sloupců ve výpisu produktů Woocommerce

Jeden z jednodušších kousků kódu pro Woocommerce, který vám pomůže upravit počet produktů v jednom řádku. Pokud potřebujete změnit čtyři sloupce na tři, stačí použít filter loop\_shop\_columns. V souboru content-product.php ve složce plugins/woocommerce/templates najdete na řádku 22

$woocommerce\_loop\['columns'\] = apply\_filters( 'loop\_shop\_columns', 4 );

A přesně ten filter ovlivníme následujícím kódem

add\_filter('loop\_shop\_columns', 'my\_loop\_columns');
if (!function\_exists('my\_loop\_columns')) {
function my\_loop\_columns() {
return 3; 
}
}

Doplnění:

Určitě budete potřebovat upravit i počet produktů na stránku, což uděláte přidáním následujícího kódu do functions.php

add\_filter( 'loop\_shop\_per\_page', create\_function( '$cols', 'return 21;' ), 20 );

[Čtěte  Katalog zboží pomocí Woocommerce](http://musilda.cz/katalog-zbozi-pomoci-woocommerce/)

#claude_reference

---
tags: ["#WOO","#WOOCOMMERCE-NÁVOD-KOMPLET","#WOO-SHOP-PLAN"]
---
# Zobrazení ceny pouze pro přihlášené uživatele ve WooCommerce

# Zobrazení ceny pouze pro přihlášené uživatele ve WooCommerce

Původně jsem chtěl tento snippet vložit jako odpověď do jednoho komentáře, ale to se mi nepovedlo korektně. Proto dnes jednoduchá funkce, která obrazí pro nepřihlášené uživatele textovou informaci.

Snippet využívá woocommerce\_get\_html\_price, který se dá využít k zajímavým věcem, jako je například zobrazení ceny pouze pro přihlášené uživatele. Výborné, pokud vytváříte klubový eshop.

Stačí použít tuto funkci:

add\_filter('woocommerce\_get\_price\_html','members\_only\_price');
 function members\_only\_price($price){
   if(is\_user\_logged\_in() ){
    return $price;
   }
   else{
     return '<a href="' .get\_permalink(woocommerce\_get\_page\_id('myaccount')). '">Login</a> or <a href="'.site\_url('/wp-login.php?action=register&redirect\_to=' . get\_permalink()).'">Register</a> to see price!';
   }
}

[Čtěte  Socute free šablona pro Woocommerce](https://musilda.cz/socute-free-sablona-pro-woocommerce/)

#claude_reference

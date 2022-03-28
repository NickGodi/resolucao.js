// main function
(function () {
    // console.log('executando o resolucao.js');

    const brokenDatabase = importJson('./broken-database.json');
    var fixedDatabase = [];

    brokenDatabase.forEach(product => {
        const fixedProd = {
            ...product,
            name: fixName(product.name),
            price: fixPrice(product.price),
            quantity: fixQuantity(product.quantity)
        }
        fixedDatabase.push(fixedProd);
        // console.log(fixedProd);
    });

    // TODO: implements validations

    exportJson('saida.json', fixedDatabase);
})();

// Functions declaration:

/**
 *
 * @param {string} file
 * @returns json
 */
function importJson(file) {
    return require(file);
}

/**
 *
 * @param {string} file
 * @param {string} content
 */
function exportJson(file, content) {
    var fs = require('fs');
    fs.writeFile(file, JSON.stringify(content), function(err) {
        if (err) {
            console.log(err);
        }
    });
}

/**
 *
 * @param {string} name
 * @returns fixed name
 */
function fixName(name) {
    // replacements array
    [
        { search: 'æ', replacement: 'a' },
        { search: '¢', replacement: 'c' },
        { search: 'ø', replacement: 'o' },
        { search: 'ß', replacement: 'b' }
    ].forEach(r => {
        name = name.replace(new RegExp(r.search, 'g'), r.replacement);
    });
    return name;
}

/**
 *
 * @param {string} price
 * @returns fixed price
 */
function fixPrice(price) {
    return parseFloat(price);
}

/**
 *
 * @param {integer|undefined} quantity
 * @returns fixed quantity
 */
function fixQuantity(quantity) {
    return (typeof quantity == 'undefined') ? 0 : quantity;
}
const products = [
    {
        id:1,
        name:"Jambon blanc",
        description :"Notre savoureux jambon a obtenu la dénomination \"supérieur\", et ce n'est pas pour rien. Découpé, notre jambon offre de belles et grandes tranches. Il a une saveur douce avec en plus une teneur en sel réduite.",
        image : "https://pictures.henri-boucher.fr/sites/default/files/bddi/images/products/3501/FRFR-3501-PLA-FRFR-500.jpg",
        categories : ["charcuterie"],
        allergenes : [""],
        price_type : "/kg",
        price : 16.90,
        promotion : false,
        highlighted : true,
        available : true,
    },
    {
        id:2,
        name:"Jambon fumé",
        description :"Notre délicieux jambon est lentement saumuré dans un bouillon puis légèrement fumé. Ce processus lui donne une belle texture, mais aussi un très bon goût.",
        image : "https://pictures.henri-boucher.fr/sites/default/files/bddi/images/products/876/FRFR-876-PLA-FRFR-500.jpg",
        categories : ["charcuterie"],
        allergenes : [""],
        price_type : "/kg",
        price : 16.90,
        promotion : false,
        highlighted : true,
        available : true,
    },
    {
        id:3,
        name:"Filet mignon",
        description :"",
        image : "https://pictures.henri-boucher.fr/sites/default/files/bddi/images/products/1/FRFR-1-PLA-FRFR-500.jpg",
        categories : ["viande", "porc"],
        allergenes : [""],
        price_type : "/kg",
        price : 17.90,
        promotion : false,
        highlighted : true,
        available : true,
    },
    {
        id:4,
        name:"Gigot d'agneau",
        description :"",
        image : "https://pictures.henri-boucher.fr/sites/default/files/bddi/images/products/82/FRFR-82-PLA-FRFR-500.jpg",
        categories : ["viande", "agneau"],
        allergenes : [""],
        price_type : "/kg",
        price : 25.90,
        promotion : false,
        highlighted : true,
        available : true,
    },
    {
        id:5,
        name:"Escalope de veau",
        description :"Les fins gourmets apprécieront cette tranche de viande maigre et tendre. Nos bouchers découpent les escalopes de veau conformément à vos souhaits. Il suffit de les faire rapidement revenir dans la poêle avant de les déguster.",
        image : "https://pictures.henri-boucher.fr/sites/default/files/bddi/images/products/105/FRFR-105-PLA-FRFR-500.jpg",
        categories : ["viande", "veau"],
        allergenes : [""],
        price_type : "/kg",
        price : 25.90,
        promotion : true,
        highlighted : false,
        available : true,
    },
    {
        id:6,
        name:"Faux filet",
        description :"",
        image : "https://pictures.henri-boucher.fr/sites/default/files/bddi/images/products/43/FRFR-43-PLA-FRFR-500.jpg",
        categories : ["viande", "boeuf"],
        allergenes : [""],
        price_type : "/kg",
        price : 24.90,
        promotion : true,
        highlighted : false,
        available : true,
    },
    {
        id:7,
        name:"Cuisse de poulet fermier",
        description :"",
        image : "https://pictures.henri-boucher.fr/sites/default/files/bddi/images/products/304/FRFR-304-PLA-FRFR-500.jpg",
        categories : ["volaille"],
        allergenes : [""],
        price_type : "/kg",
        price : 10.00,
        promotion : true,
        highlighted : false,
        available : true,
    },
    {
        id:8,
        name:"Cassoulet",
        description :"",
        image : "https://pictures.henri-boucher.fr/sites/default/files/bddi/images/products/277/FRFR-277-PLA-FRFR-500.jpg",
        categories : ["traiteur"],
        allergenes : [""],
        price_type : "/pc",
        price : 9.90,
        promotion : true,
        highlighted : false,
        available : true,
    },
    {
        id:9,
        name:"Travers de porc marinés",
        description :"Ces travers maigres sont indispensables pour votre barbecue. Nos bouchers découpent ces savoureux travers dans la poitrine et retirent également la couenne. Les travers sont aromatisés de notre propre marinade barbecue.",
        image : "https://pictures.henri-boucher.fr/sites/default/files/bddi/images/products/379/FRFR-379-PLA-FRFR-500.jpg",
        categories : ["traiteur", "barbecue"],
        allergenes : [""],
        price_type : "/kg",
        price : 13.90,
        promotion : false,
        highlighted : false,
        available : true,
    },
]

export default products;
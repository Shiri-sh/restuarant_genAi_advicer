const organizeDBOutput = (dishes) => {
    return dishes.map(dish => {
            return `name: ${dish.name},
             ingredients: ${dish.ingredients}, 
             price: ${dish.price},
             image_url: ${dish.image_url},
             category_id: ${dish.category_id},
             is_vegan: ${dish.is_vegan},
             is_vegetarian: ${dish.is_vegetarian},
             on_sale: ${dish.on_sale},
             sale_price: ${dish.sale_price},
             created_at: ${dish.created_at},`;

        }).join("\n");
}
module.exports = { organizeDBOutput };
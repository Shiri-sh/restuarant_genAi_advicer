import con from "../db.js";

const getDishes = async () => {
  try {
    console.log("🔥 getDishes SQL CALLED");
    const sql = `
      SELECT 
        d.*,
        c.name AS category_name
      FROM dishes d
      JOIN categories c ON d.category_id = c.id
      WHERE d.in_stock = 1
    `;
    const [rows] = await con.query(sql);
    console.log(Object.keys(rows[0]));
    return rows;
  } catch (err) {
    throw err;
  }
};
const addDish=async(name,price,ingredients,image_url,category_id,is_vegan,is_vegetarian,in_stock,on_sale,sale_price)=>{
    try{
        const sql='INSERT INTO dishes (name,price,ingredients,image_url,category_id,is_vegan,is_vegetarian,in_stock,on_sale,sale_price) VALUES (?,?,?,?,?,?,?,?,?,?)';
        const [result] = await con.query(sql, [name,price,ingredients,image_url,category_id,is_vegan,is_vegetarian,in_stock,on_sale,sale_price]);
        return result.insertId;
    }
    catch(err){
        throw err;
    }
};
const getDishesByName = async (name) => {
    try {
      const sql = "SELECT * FROM dishes WHERE name = ?";
      const [rows] = await con.query(sql, [name]);
      return{
        id: rows[0].id,
        name: rows[0].name,
        price: rows[0].price,
        image_url: rows[0].image_url,
        ingredients: rows[0].ingredients,
        category_id: rows[0].category_id,
        is_vegan: rows[0].is_vegan,
        is_vegetarian: rows[0].is_vegetarian,
        on_sale: rows[0].on_sale,
        sale_price: rows[0].sale_price
      };
    } catch (err) {
      throw err;
    }
  };
export { getDishes, addDish, getDishesByName };
import con from "../db.js";

const getDishes = async () => {
  try {
    const sql = "SELECT name, price, ingredients, category_id, is_vegan, is_vegetarian, on_sale, sale_price FROM dishes WHERE in_stock = 1";
    const [rows] = await con.query(sql);
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

export { getDishes, addDish };
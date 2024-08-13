import { fetchData } from "../postgres/postgres.js";

export async function getAllCategory(req, res) {
    const parentsCategories = await fetchData(
        "SELECT * FROM category WHERE category_id is NULL;"
    );
    for (const c of parentsCategories){
        const subCategories = await fetchData(
            "SELECT * FROM category WHERE category_id = $1;",
            c.id
        );
        c.subCategories=subCategories;
    }
    res.send({
        message:"Success",
        data : parentsCategories
    })
}

export async function getCategory(req, res) {
    const { id } = req.params;
    const category = await fetchData("SELECT * FROM category WHERE id=$1;", id);
    res.send({
        message: "success",
        data: category
    });
}

export async function createCategory(req, res) {
    const data = req.body;
    await fetchData(
        "INSERT INTO category VALUES ($1, $2, $3);",
        data.id,
        data.name,
        data.category_id
    );
    res.send("Muvaffaqqiyatli qo'shildi");
}

export async function updateCategory(req,res){
    const data = req.body;
    const {id} = req.params;

    await fetchData(
        `UPDATE category SET name = $1 WHERE id = ${id};`,
        data.name
    );
    res.send("Muvaffaqqiyatli o'zgartirildi");
}

export async function deleteCategory(req, res) {
    const {id} = req.params;
    await fetchData(
        `DELETE FROM category WHERE id = ${id};` 
    );
    res.send("Muvaffaqqiyatli o'chirildi")
}

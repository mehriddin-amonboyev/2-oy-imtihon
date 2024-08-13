import { fetchData } from "../postgres/postgres.js";

export async function getAllProduct(req, res) {
    const parentsProducts = await fetchData(
        "SELECT * FROM product;"
    );
    for (const c of parentsProducts) {
        const subProducts = await fetchData(
            "SELECT * FROM product WHERE id = $1;",
            c.id
        );
    }
    res.send({
        message: "Success",
        data: parentsProducts
    })
}

export async function getProduct(req, res) {
    const { id } = req.params;
    const product = await fetchData("SELECT * FROM product WHERE id=$1;", id);
    res.send({
        message: "success",
        data: product
    });
}

export async function createProduct(req, res) {
    const data = req.body;
    const response = await fetchData(
        "INSERT INTO product (id, name, price, information, category_id) VALUES ($1, $2, $3, $4, $5);",
        data.id,
        data.name,
        data.price,
        data.information,
        data.category_id
    );
    res.send("Muvaffaqqiyatli qo'shildi");
}

export async function updateProduct(req, res) {
    const data = req.body;
    const { id } = req.params;

    const response = await fetchData(
        `UPDATE category SET name = $1 price = $2 information = $3 WHERE id = ${id};`,
        data.name,
        data.price,
        data.information
    );
    res.send("Muvaffaqqiyatli o'zgartirildi");
}

export async function deleteProduct(req, res) {
    const { id } = req.params;
    await fetchData(`DELETE FROM product WHERE id = ${id};`);

    res.send("Muvaffaqqiyatli o'chirildi");
}

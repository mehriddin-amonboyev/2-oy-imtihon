import { fetchData } from "../postgres/postgres.js";

// export async function getAllContractItem(req, res) {
//     const parentsCategories = await fetchData(
//         "SELECT * FROM contracts_item WHERE contracts_item_id is NULL;"
//     );
//     for (const c of parentsCategories){
//         const subCategories = await fetchData(
//             "SELECT * FROM contracts_item WHERE contracts_item_id = $1;",
//             c.id
//         );
//         c.subCategories=subCategories;
//     }
//     res.send({
//         message:"Success",
//         data : parentsCategories
//     })
// }

export async function getContractItem(req, res) {
    const { id } = req.params;
    const contractItem = await fetchData("SELECT * FROM contracts_item WHERE id=$1;", id);
    res.send({
        message: "success",
        data: contractItem
    });
}

export async function createContractItem(req, res) {
    const data = req.body;
    await fetchData(
        "INSERT INTO contracts_item (id, product_id, count, price, contract_id) VALUES ($1, $2, $3, $4, $5);",
        data.id,
        data.product_id,
        data.count,
        data.price,
        data.contract_id,
    );
    res.send("Muvaffaqqiyatli qo'shildi");
}

export async function updateContractItem(req,res){
    const data = req.body;
    const {id} = req.params;

    await fetchData(
        `UPDATE contracts_item SET product_id = $1, count = $2, price = $3, contract_id = $4 WHERE id = ${id};`,
        data.product_id,
        data.count,
        data.price,
        data.contract_id
    );
    res.send("Muvaffaqqiyatli o'zgartirildi");
}

export async function deleteContractItem(req, res) {
    const {id} = req.params;
    await fetchData(
        `DELETE FROM contracts_item WHERE id = ${id};` 
    );
    res.send("Muvaffaqqiyatli o'chirildi")
}

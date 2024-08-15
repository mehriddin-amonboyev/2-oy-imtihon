import { fetchData } from "../postgres/postgres.js";

// export async function getContracts(req, res) {
//     const parentsCategories = await fetchData(
//         "SELECT * FROM contracts WHERE contracts_id is NULL;"
//     );
//     for (const c of parentsCategories){
//         const subCategories = await fetchData(
//             "SELECT * FROM contracts WHERE contracts_id = $1;",
//             c.id
//         );
//         c.subCategories=subCategories;
//     }
//     res.send({
//         message:"Success",
//         data : parentsCategories
//     })
// }

export async function getContracts(req, res) {
    const { id } = req.params;
    const contracts = await fetchData("SELECT * FROM contracts WHERE id=$1;", id);
    res.send({
        message: "success",
        data: contracts
    });
}

export async function createContracts(req, res) {
    const data = req.body;
    await fetchData(
        "INSERT INTO contracts (id, contract_type, customer_id) VALUES ($1, $2, $3);",
        data.id,
        data.contract_type,
        data.customer_id
    );

    const contracts_item = await fetchData("SELECT * FROM contracts_item WHERE contract_id = $1;", data.id);
    for(const c of contracts_item){
        await fetchData(
            "INSERT INTO contracts (id, contract_type, customer_id) VALUES ($1, $2, $3);",
            data.id,
            data.contract_type,
            data.customer_id,
        );
    }
    res.send("Muvaffaqqiyatli qo'shildi");
}

export async function updateContracts(req,res){
    const data = req.body;
    const {id} = req.params;

    await fetchData(
        `UPDATE contracts SET product_id = $1, count = $2, price = $3, contract_id = $4 WHERE id = ${id};`,
        data.product_id,
        data.count,
        data.price,
        data.contract_id
    );
    res.send("Muvaffaqqiyatli o'zgartirildi");
}

export async function deleteContracts(req, res) {
    const {id} = req.params;
    await fetchData(
        `DELETE FROM contracts WHERE id = ${id};` 
    );
    res.send("Muvaffaqqiyatli o'chirildi")
}

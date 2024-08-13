import { fetchData } from "../postgres/postgres.js";

export async function getCustomer(req, res) {
    const { id } = req.params;
    const customer = await fetchData(`SELECT * FROM customer WHERE id = ${id};`);
    res.send({
        message: "success",
        data: customer
    });
}

export async function blacklisted(req, res) {
    const customers = await fetchData(`SELECT * FROM customer WHERE all_backlog > 0;`);
    res.send({ customers });
}

export async function createCustomer(req, res) {
    const data = req.body;
    await fetchData(
        "INSERT INTO customer (id, full_name, email, password, phone, all_backlog) VALUES ($1, $2, $3, $4, $5, 0);",
        data.id,
        data.full_name,
        data.email,
        data.password,
        data.phone
    );
    res.send("Muvaffaqqiyatli qo'shildi");
}

export async function updateCustomer(req, res) {
    const data = req.body;
    const { id } = req.params;

    const response = await fetchData(
        `UPDATE customer SET full_name = $1, email = $2, password = $3, phone = $4 WHERE id = ${id};`,
        data.full_name,
        data.email,
        data.password,
        data.phone
    );
    res.send("Muvaffaqqiyatli o'zgartirildi");
}

export async function deleteCustomer(req, res) {
    const { id } = req.params;
    await fetchData(`DELETE FROM customer WHERE id = ${id};`);

    res.send("Muvaffaqqiyatli o'chirildi");
}

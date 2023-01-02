import { pool } from "../db.js";


export const getExpenses = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM gastos ORDER BY date DESC LIMIT 50');
        res.send(rows);
	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong.'
		})
	}
};

export const createExpense = async (req, res) => {
    const {descripcion, monto, id_usuario, date, total } = req.body;
	console.log(req.body)

    try {
        const [rows] = await pool.query('INSERT INTO gastos (descripcion, monto, id_usuario, date, total) VALUES (?, ?, ?, ?, ?)', [descripcion, monto, id_usuario, date, total]);
        res.send({
            id: rows.insertId,
            descripcion,
            monto,
            id_usuario
        });
	} catch (error) {
		return res.status(500).json({
			message: error
		})
	}
};


export const updateExpense = async (req, res) => {
	const { id } = req.params;
	const { descripcion, monto, date, id_usuario } = req.body;

	try {
		const [result] = await pool.query('UPDATE gastos SET descripcion = IFNULL(?, descripcion), monto = IFNULL(?, monto), date = IFNULL(?, date), id_usuario = IFNULL(?, id_usuario) WHERE idgastos = ?', [descripcion, monto, date, id_usuario, id]);
		if (result.affectedRows === 0) return res.status(404).json({
			message: 'Expense not found'
		})
		const [rows] = await pool.query('SELECT * FROM gastos WHERE idgastos = ?', [id]);
		res.send(rows[0]);
	} catch (error) {
		return res.status(500).json({
			message: 'Expense not found'
		})
	}
};

export const balance = async (req, res) => {
	try {
		const [result] = await pool.query('UPDATE gastos SET pagado = true');
		if (result.affectedRows === 0) return res.status(404).json({
			message: 'Expense not found'
		})
		const [rows] = await pool.query('SELECT * FROM gastos');
		res.send(rows);
	} catch (error) {
		return res.status(500).json({
			message: 'Expense not found'
		})
	}
};

export const deleteExpense = async (req, res) => {
	try {
		const [result] = await pool.query('DELETE FROM gastos WHERE idgastos = ?', [req.params.id]);
		if (result.affectedRows <= 0) return res.status(404).json({
			message: 'Expense not found'
		})
		res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({
			message: 'Expense not found'
		})
	}

};
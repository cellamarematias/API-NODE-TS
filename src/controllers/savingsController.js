import { pool } from "../db.js";


export const getSavings = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ahorros');
        res.send(rows);
	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong.'
		})
	}
};

export const createSaving = async (req, res) => {
    const {moneda, monto, id_usuario, date } = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO ahorros (moneda, monto, id_usuario, date) VALUES (?, ?, ?, ?)', [moneda, monto, id_usuario, date]);
        res.send({
            id: rows.insertId,
            moneda,
            monto,
            id_usuario,
			date
        });
	} catch (error) {
		return res.status(500).json({
			message: error
		})
	}
};


export const updateSaving = async (req, res) => {
	const { id } = req.params;
	const { moneda, monto, id_usuario, date } = req.body;

	try {
		const [result] = await pool.query('UPDATE ahorros SET moneda = IFNULL(?, moneda), monto = IFNULL(?, monto), id_usuario = IFNULL(?, id_usuario), date = IFNULL(?, date) WHERE idahorros = ?', [moneda, monto, id_usuario, id, date]);
		if (result.affectedRows === 0) return res.status(404).json({
			message: 'Saving not found'
		})
		const [rows] = await pool.query('SELECT * FROM ahorros WHERE idahorros = ?', [id]);
		res.send(rows[0]);
	} catch (error) {
		return res.status(500).json({
			message: 'Saving not found'
		})
	}
};

export const deleteSaving = async (req, res) => {
	try {
		const [result] = await pool.query('DELETE FROM ahorros WHERE idahorros = ?', [req.params.id]);
		if (result.affectedRows <= 0) return res.status(404).json({
			message: 'Saving not found'
		})
		res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({
			message: 'Saving not found'
		})
	}

};

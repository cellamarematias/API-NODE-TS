import { pool } from "../db.js";

export const getUsers = async (req, res) => {
	try {
		const [rows] = await pool.query('SELECT * FROM usuario');
		res.send(rows);
	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong.'
		})
	}
};

export const getUserById = async (req, res) => {
	try {
		const [rows] = await pool.query('SELECT * FROM usuario WHERE idusuario = ?', [req.params.id]);
		if (rows.length <= 0) return res.status(404).json({
			message: 'User not found'
		})
		res.send(rows);
	} catch (error) {
		return res.status(500).json({
			message: 'User not found'
		})
	}
};

export const createUser = async (req, res) => {
	const { nombre, usuario, password } = req.body;

	try {
		const [rows] = await pool.query('INSERT INTO usuario (nombre, usuario, password) VALUES (?, ?, ?)', [nombre, usuario, password]);
		res.send({
			id: rows.insertId,
			nombre,
			usuario
		});
	} catch (error) {
		return res.status(500).json({
			message: 'User not found'
		})
	}
};

export const updateUser = async (req, res) => {
	const { id } = req.params;
	const { nombre, usuario, password } = req.body;

	try {
		//IFNULL hace que no se modifique el valor si viene nulo - para actualizar solo algunos campos
		const [result] = await pool.query('UPDATE usuario SET nombre = IFNULL(?, nombre), usuario = IFNULL(?, usuario), password = IFNULL(?, password) WHERE idusuario = ?', [nombre, usuario, password, id]);
		if (result.affectedRows === 0) return res.status(404).json({
			message: 'User not found'
		})
		const [rows] = await pool.query('SELECT * FROM usuario WHERE idusuario = ?', [id]);
		res.send(rows[0]);
	} catch (error) {
		return res.status(500).json({
			message: 'User not found'
		})
	}
};

export const deleteUser = async (req, res) => {
	try {
		const [result] = await pool.query('DELETE FROM usuario WHERE idusuario = ?', [req.params.id]);
		if (result.affectedRows <= 0) return res.status(404).json({
			message: 'User not found'
		})
		res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({
			message: 'User not found'
		})
	}

};

export const authUser = async (req, res) => {
	const { usuario, password } = req.body;

	console.log(req.body);

	try {
		const [rows] = await pool.query('SELECT * FROM usuario WHERE usuario = ? AND password = ?', [ usuario, password ]);
		if (rows.length <= 0) return res.status(404).json({
			message: 'User not found',
			authorized: false
		})
		res.status(200).json({
			user: usuario,
			message: 'Authorized',
			authorized: true
		})
	} catch (error) {
		return res.status(500).json({
			message: error
		})
	}
};
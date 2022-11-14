import { pool } from "../db.js";
import jsonwebtoken from 'jsonwebtoken';
const { sign, decode, verify } = jsonwebtoken;

export const getTask = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tareas');
        res.send(rows);
	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong.'
		})
	}
};

export const createTasks = async (req, res) => {
    const {titulo, descripcion, date, id_usuario, done } = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO tareas (titulo, descripcion, date, id_usuario, done) VALUES (?, ?, ?, ?, ?)', [titulo, descripcion, date, id_usuario, done]);
        res.send({
            id: rows.insertId,
            titulo,
            descripcion,
            date,
            id_usuario,
            done
        });
	} catch (error) {
		return res.status(500).json({
			message: error
		})
	}
};


export const updateTask = async (req, res) => {
	const { id } = req.params;
	const { titulo, descripcion, date, id_usuario, done } = req.body;

	try {
		const [result] = await pool.query('UPDATE tareas SET titulo = IFNULL(?, titulo), descripcion = IFNULL(?, descripcion), date = IFNULL(?, date), id_usuario = IFNULL(?, id_usuario), done = IFNULL(?, done) WHERE idtareas = ?', [titulo, descripcion, date, id_usuario, done, id]);
		if (result.affectedRows === 0) return res.status(404).json({
			message: 'Task not found'
		})
		const [rows] = await pool.query('SELECT * FROM tareas WHERE idtareas = ?', [id]);
		res.send(rows[0]);
	} catch (error) {
		return res.status(500).json({
			message: 'Task not found'
		})
	}
};

export const deleteTask = async (req, res) => {
	try {
		const [result] = await pool.query('DELETE FROM tareas WHERE idtareas = ?', [req.params.id]);
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
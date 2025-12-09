import React, { useEffect, useState } from "react";
import api from "../api";

const Pantry = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", expiryDate: "" });
  const [editId, setEditId] = useState(null);

  const load = () => {
    api
      .get("/pantry")
      .then((res) => setItems(res.data))
      .catch(() => alert("Login required"));
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (editId) {
      await api.put(`/pantry/${editId}`, form);
    } else {
      await api.post("/pantry", form);
    }

    setForm({ name: "", quantity: "", expiryDate: "" });
    setEditId(null);
    load();
  };

  const remove = async (id) => {
    await api.delete(`/pantry/${id}`);
    load();
  };

  return (
    <div className="page">
      <h2>Pantry Manager</h2>

      {/* BIG WIDE FORM */}
      <form className="panel pantry-form" onSubmit={submit}>
        <div className="pantry-form-row">
          <div className="pantry-field">
            <label>Item name</label>
            <input
              placeholder="e.g. paneer, tomatoes, leftover rice"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="pantry-field pantry-field-small">
            <label>Quantity</label>
            <input
              placeholder="e.g. 500 g, 2 pcs"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: e.target.value })
              }
            />
          </div>

          <div className="pantry-field pantry-field-small">
            <label>Expiry date</label>
            <input
              type="date"
              value={form.expiryDate}
              onChange={(e) =>
                setForm({ ...form, expiryDate: e.target.value })
              }
            />
          </div>

          <div className="pantry-field pantry-field-button">
            <button className="btn btn-solid btn-full">
              {editId ? "Update item" : "Add item"}
            </button>
          </div>
        </div>
      </form>

      {/* ITEMS TABLE */}
      <div className="panel pantry-items-card">
        <h3>Items</h3>
        {items.length === 0 ? (
          <p className="muted">No items yet. Add what’s in your kitchen above.</p>
        ) : (
          <table className="pantry-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Expiry</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i._id}>
                  <td>{i.name}</td>
                  <td>{i.quantity || "-"}</td>
                  <td>
                    {i.expiryDate
                      ? new Date(i.expiryDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    <button
                      className="btn btn-small btn-outline"
                      onClick={() => {
                        setEditId(i._id);
                        setForm({
                          name: i.name,
                          quantity: i.quantity,
                          expiryDate: i.expiryDate?.slice(0, 10) || "",
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-small btn-text"
                      onClick={() => remove(i._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Pantry;

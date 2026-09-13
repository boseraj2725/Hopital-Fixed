import "../styles/Medicine.css";

function Medicine() {
  return (
    <div className="medicine">

      <h1>Medicine Management</h1>

      <div className="top-bar">

        <input
          type="text"
          placeholder="Search Medicine..."
        />

        <button>Add Medicine</button>

      </div>

      <table>

        <thead>

          <tr>
            <th>Medicine</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          <tr>
            <td>Paracetamol</td>
            <td>Tablet</td>
            <td>₹50</td>
            <td>250</td>

            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>

          </tr>

          <tr>
            <td>Vitamin C</td>
            <td>Capsule</td>
            <td>₹120</td>
            <td>180</td>

            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>

          </tr>

          <tr>
            <td>Cough Syrup</td>
            <td>Syrup</td>
            <td>₹90</td>
            <td>95</td>

            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}

export default Medicine;
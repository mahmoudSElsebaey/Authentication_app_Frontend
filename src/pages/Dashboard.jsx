import { useGetUsersQuery } from "../redux/features/users/usersApiSlice";

export default function Dashboard() {
  const {
    data: users,
    isSuccess,
    isError,
    isLoading,
    error,
  } = useGetUsersQuery();

  const handleEdit = (user) => {
    console.log("Edit user:", user);
    // هنا هتفتح مودال أو تنقله لصفحة edit
  };

  const handleDelete = (id) => {
    console.log("Delete user ID:", id);
    // هنا هتستخدم delete mutation من RTK Query
  };

  return (
    <>
      <h1>Dashboard Page</h1>

      {isLoading && <p>Loading users...</p>}

      {isError && (
        <p>Error: {error?.data?.message || "Failed to load users."}</p>
      )}

      {isSuccess && users?.users && users.users.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#eee" }}>
              <th style={thStyle}>First Name</th>
              <th style={thStyle}>Last Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Age</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.users.map((user) => (
              <tr key={user._id}>
                <td style={tdStyle}>{user.fname}</td>
                <td style={tdStyle}>{user.lname}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.age}</td>
                <td style={tdStyle}>
                  <button
                    style={editBtn}
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>

                  <button
                    style={deleteBtn}
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  backgroundColor: "#fafafa",
};

const editBtn = {
  padding: "6px 12px",
  marginRight: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const deleteBtn = {
  padding: "6px 12px",
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

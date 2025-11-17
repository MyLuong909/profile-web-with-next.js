import sql from "mssql";
import bcrypt from "bcryptjs";

const config = {
  user: "sa",
  password: "123456",
  server: "localhost",
  database: "MyDatabase",
  options: { trustServerCertificate: true }
};

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    let pool = await sql.connect(config);

    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Users WHERE email=@email");

    if (result.recordset.length === 0) {
      return Response.json({ success: false, message: "Email không tồn tại" });
    }

    const user = result.recordset[0];

    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      return Response.json({ success: false, message: "Sai mật khẩu" });
    }

    return Response.json({ success: true, message: "Đăng nhập thành công!" });
  } 
  catch (err) {
    return Response.json({ success: false, message: "Lỗi server" });
  }
}


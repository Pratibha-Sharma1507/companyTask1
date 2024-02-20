const connection = require("../../Model/dbConnect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 10;

const signup = async (req, res) => {
  try {
    const { userid, name, password } = req.body;
    // console.log(req.body);
    const query = "SELECT * FROM users WHERE userid = ?";
    const query1 = "INSERT INTO users SET ?";
    const salt = await bcrypt.genSalt(10);
    console.log("salt", salt);
    const pass = await bcrypt.hash(password, salt);
    console.log("password", password);
    const data1 = {
      userid,
      name,
      password: pass

    };
    connection.query(query, [userid], (error, result) => {
      if (result.length) {
        return res.send({ message: "user_id already Exist" });
      }
      connection.query(query1, [data1], (err, result) => {
        if (err) {
          return res.send({ Error: err.sqlMessage });
        }
        return res.send({ Status: 200, Response: result });
      });
    });
  } catch (err) {
    res.send(err.sqlMessage);
  }
};

const login = async (req, res) => {
  const { userid, password } = req.body;
  const sql = "SELECT * FROM users WHERE userid = ?";
  connection.query(sql, [userid, password], (err, data) => {
    if (err) return res.json({ Error: "Login error in server" });
    if (data.length > 0) {

      bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
        if (err) return res.json({ Error: "Password compare error" });
        if (response) {
          const name = data[0].name;
          const userid = data[0].userid;
          const roleQuery = "SELECT rolename FROM roles WHERE roleid IN (SELECT roleid FROM role_assign WHERE userid = ?)"
          connection.query(roleQuery, [userid], (err, roleData) => {
            if (err) return res.json({ Error: "Role retrieval error" });
            if (roleData.length > 0) {
              // console.log(roleData)
              const rolename = roleData[0].rolename;

              const accessToken = jwt.sign({ userid, rolename }, "jwt-secret-key", { expiresIn: '15m' }); // Access token expires in 15 minutes
              const refreshToken = jwt.sign({ userid }, "refresh-token-secret-key", { expiresIn: '7d' }); // Refresh token expires in 7 days
              // Set tokens and user id in cookies
              res.cookie('access_token', accessToken, { httpOnly: true });
              res.cookie("refresh_token", refreshToken, { httpOnly: true });
              res.cookie("id", userid);
              
              const roles = roleData.map(role => role.rolename);
              if (roles == 'admin') {                       //When employee is Admin
                res.json("You have all admin rights");
              }
              else if (roles == 'clerk') {                  //When employee is Clerk
                res.json("You have clear rights, redirect");
              }
              else if (roles == 'manager') {                //When employee is Clerk
                res.json("You have manager rights");
              }
              else if (roles == 'hr') {                     //When employee has HR role
                res.json("You have HR rights");
              }
              else if (roles[0] == 'clerk' && roles[1] == 'hr') { //When one employee has many roles
                res.json("You have authorization of Cleark and HR")
              }
              else {
                return res.json({ Error: "No role assigned to the user", role:roles });
              }
            }
          });
        } else {
          return res.json({ Error: "Password not matched" });
        }
      });
    } else {
      return res.json({ Error: "No user_id existed" });
    }
  });
}
const logout = (req, res) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  return res.status(200).json({ message: "Logout successful" });
};
module.exports = { signup, login, logout }
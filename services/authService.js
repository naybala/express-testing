const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../config/db");

const JWT_SECRET = process.env.JWT_SECRET || "superSecretKey";

async function authenticateUser(email, password) {
  //const user = await prisma.user.findUnique({ where: { email } });

  const user = prisma.user.findFirst({
    where: {
      deletedAt: null,
    },
  });
  console.log(user);

  // if (!user) return null;

  // const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) return null;

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

  return { user, token };
}

async function createUser({ email, password, name }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return newUser;
}

module.exports = {
  authenticateUser,
  createUser,
};

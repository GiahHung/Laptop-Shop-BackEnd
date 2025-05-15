require("dotenv").config();
import { OAuth2Client } from "google-auth-library";
import GoogleService from "../service/GoogleService";

const clientId = process.env.CLIENT_ID;
const client = new OAuth2Client(clientId);

let verifyToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId,
  });
  const payload = ticket.payload;
  return payload;
};

let googleAuth = async (req, res) => {
  try {
    const token = req.body.token;
    //console.log("Token type:", req.body);
    const payload = await verifyToken(token);
    const { email, name } = payload;
    const result = await GoogleService.googleAuth(email, name);
    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(401).json({
      errCode: -1,
      errMessage: "error from server!",
    });
  }
};

export default { googleAuth };

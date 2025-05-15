const nodemailer = require("nodemailer");

const sendEmail = async (transport, mailDetail) => {
  try {
    await transport.sendMail(mailDetail);
    console.log("send mail success");
  } catch (e) {
    console.log("Check mail error", e);
  }
};

const sendMail = async (req, res) => {
  try {
    const email = req.query.email;
    const phoneNumber = req.query.phoneNumber;
    const fullName = req.query.fullName;
    const address = req.query.address;
    const mailTransporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "giahung110804@gmail.com",
        pass: "zbnvfvhedxlnbxjb",
      },
    });
    const mailDetail = {
      from: "giahung110804@gmail.com",
      to: email,
      subject: "LaptopShop - Xác nhận đơn hàng",
      html: `
    <p>Chúng tôi cảm ơn bạn đã mua hàng tại <strong>LaptopShop</strong>.</p>
    <p>Đơn hàng của bạn đã được <span style="color:green; font-weight: bold;">duyệt</span> và sẽ được giao đến bạn trong thời gian sớm nhất.</p>
    <p>Tên: ${fullName}</p>
    <p>SDT: ${phoneNumber}</p>
    <p>Địa chỉ: ${address}</p>
    <p>Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ <a href="mailto:giahung110804@gmail.com">giahung110804@gmail.com</a>.</p>
    <br>
    <p>Trân trọng,</p>
    <p><strong>Đội ngũ LaptopShop</strong></p>
  `,
    };
    await sendEmail(mailTransporter, mailDetail);
    return res.status(200).json({
      errCode: 0,
      errMessage: "send mail success",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: 1,
      errMessage: "error from server",
    });
  }
};

export default { sendMail };

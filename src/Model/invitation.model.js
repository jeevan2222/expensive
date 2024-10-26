const Imap = require('imap');
const { inspect } = require('util');
const { simpleParser } = require('mailparser');
const AmountTrack = require("../schema/amountTrack");

const getAmountInfo = () => {  
  const imap = new Imap({
    user: 'jeevantest64@gmail.com',
    password: 'aora lfje anli ajnp',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
  });
  
  function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
  }

  imap.once('ready', function() {
    openInbox((err, box) => {
      if (err) throw err;
      const last24hDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      imap.search(['UNSEEN', ['SINCE', last24hDate]], (err, results) => {
        if (err || !results || results.length === 0) {
          console.log("No new emails found.");
          imap.end();
          return;
        }
        const f = imap.fetch(results, { bodies: '' });
        f.on('message', msg => {
          msg.on('body', stream => {
            simpleParser(stream, async (err, parsed) => {
              if (err) {
                console.log("Error parsing email:", err);
                return;
              }
              if (parsed.subject && parsed.subject.startsWith("Sent ₹")) {
                console.log("****************************************************************");
                const receivedEmail = parsed.headerLines[0]?.line.replace("Delivered-To:", "").trim();
                const money = parsed.subject.match(/₹\s*(\d+)/)?.[1];
                const paidDate = parsed.date;
                const paidTo = parsed.subject.split("to")[1]?.trim();
                try {
                  const amountres = await AmountTrack.create({
                    email: receivedEmail,
                    message: "",
                    date: paidDate.toString(),
                    paid_to: paidTo,
                    amount: money
                  });
                  console.log(amountres.dataValues);
                } catch (error) {
                  console.log("Error saving to database:", error);
                }
                console.log(receivedEmail);
              }
            });

            msg.once('attributes', attrs => {
              const { uid } = attrs;
              imap.addFlags(uid, ['\\Seen'], () => {
                console.log('Marked as read!');
              });
            });
          });
        });

        f.once('error', ex => {
          console.error("Fetch error:", ex);
          return Promise.reject(ex);
        });

        f.once('end', () => {
          console.log('Done fetching all messages!');
          imap.end();
        });
      });
    });
  });

  imap.once('error', function(err) {
    console.log("IMAP connection error:", err);
  });

  imap.once('end', function() {
    console.log('Connection ended');
  });

  imap.connect();
};

module.exports = {
  getAmountInfo
};

"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _bodyParser = require("body-parser");
var _index = _interopRequireDefault(require("../models/index"));
var _bcryptjs = _interopRequireWildcard(require("bcryptjs"));
var _sequelize = require("sequelize");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _express = require("express");
var _ejs = require("ejs");
var _queryTypes = require("sequelize/lib/query-types");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require("dotenv").config();
var salt = _bcryptjs["default"].genSaltSync(10);
var hashPassword = function hashPassword(password) {
  return new Promise(/*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
      var _hashPassword;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _bcryptjs["default"].hashSync(password, salt);
          case 3:
            _hashPassword = _context.sent;
            resolve(_hashPassword);
            _context.next = 10;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 7]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var checkEmail = function checkEmail(userEmail) {
  return new Promise(/*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
      var check;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _index["default"].User.findOne({
              where: {
                email: userEmail
              },
              raw: false
            });
          case 3:
            check = _context2.sent;
            if (check) {
              resolve(true);
            } else {
              resolve(false);
            }
            _context2.next = 10;
            break;
          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            reject(_context2.t0);
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 7]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var registerService = function registerService(inputData) {
  return new Promise(/*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
      var check, hashPasswordFromBcrypt, user, token;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            if (!(!inputData.email || !inputData.password || !inputData.phoneNumber)) {
              _context3.next = 5;
              break;
            }
            resolve({
              errCode: 2,
              errMessage: "Missing parameter input!!!"
            });
            _context3.next = 20;
            break;
          case 5:
            _context3.next = 7;
            return checkEmail(inputData.email);
          case 7:
            check = _context3.sent;
            if (!(check == true)) {
              _context3.next = 12;
              break;
            }
            resolve({
              errCode: 3,
              errMessage: "Email is already in use"
            });
            _context3.next = 20;
            break;
          case 12:
            _context3.next = 14;
            return hashPassword(inputData.password);
          case 14:
            hashPasswordFromBcrypt = _context3.sent;
            _context3.next = 17;
            return _index["default"].User.create({
              firstName: inputData.firstName,
              lastName: inputData.lastName,
              phoneNumber: inputData.phoneNumber,
              email: inputData.email,
              password: hashPasswordFromBcrypt,
              roleId: inputData.roleId
            });
          case 17:
            user = _context3.sent;
            token = user && _jsonwebtoken["default"].sign({
              email: user.email
            }, process.env.SECRET_JWT, {
              expiresIn: "2d"
            });
            resolve({
              errCode: 0,
              errMessage: "Register success!!!",
              token: token || null
            });
          case 20:
            _context3.next = 25;
            break;
          case 22:
            _context3.prev = 22;
            _context3.t0 = _context3["catch"](0);
            reject(_context3.t0);
          case 25:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 22]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var loginService = function loginService(email, password) {
  return new Promise(/*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resolve, reject) {
      var userData, isExist, user, check, isCorrect, token;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            userData = {};
            _context4.next = 3;
            return checkEmail(email);
          case 3:
            isExist = _context4.sent;
            _context4.prev = 4;
            if (!(!email || !password)) {
              _context4.next = 9;
              break;
            }
            resolve({
              errCode: 5,
              errMessage: "Missing parameter "
            });
            _context4.next = 19;
            break;
          case 9:
            if (!isExist) {
              _context4.next = 16;
              break;
            }
            _context4.next = 12;
            return _index["default"].User.findOne({
              attributes: ["id", "email", "password", "firstName", "lastName", "roleId"],
              where: {
                email: email
              },
              raw: true
            });
          case 12:
            user = _context4.sent;
            if (user) {
              check = _bcryptjs["default"].compareSync(password, user.password);
              isCorrect = user && check;
              token = isCorrect && _jsonwebtoken["default"].sign({
                email: user.email,
                roleId: user.roleId
              }, process.env.SECRET_JWT, {
                expiresIn: "2d"
              });
              if (check) {
                userData.errCode = 0;
                userData.errMessage = "Ok";
                userData.token = token;
                delete user.password;
                userData.user = user;
              } else {
                userData.errCode = 3;
                userData.errMessage = "password wrong";
              }
            } else {
              userData.errCode = 3;
              userData.errMessage = "User doesnt exist ?";
            }
            _context4.next = 18;
            break;
          case 16:
            userData.errCode = 4;
            userData.errMessage = "Email wrong";
          case 18:
            resolve(userData);
          case 19:
            _context4.next = 24;
            break;
          case 21:
            _context4.prev = 21;
            _context4.t0 = _context4["catch"](4);
            reject(_context4.t0);
          case 24:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[4, 21]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var getAllPageUsersService = function getAllPageUsersService(page, limit) {
  return new Promise(/*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(resolve, reject) {
      var offset, _yield$db$User$findAn, count, rows, totalPage;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            offset = (page - 1) * limit;
            _context5.next = 4;
            return _index["default"].User.findAndCountAll({
              order: [["id", "DESC"]],
              attributes: {
                exclude: ["password"]
              },
              offset: offset,
              limit: limit
            });
          case 4:
            _yield$db$User$findAn = _context5.sent;
            count = _yield$db$User$findAn.count;
            rows = _yield$db$User$findAn.rows;
            totalPage = Math.ceil(count / limit);
            resolve({
              errCode: 0,
              errMessage: "Success!!!",
              total: count,
              totalPage: totalPage,
              user: rows
            });
            _context5.next = 14;
            break;
          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](0);
            reject(_context5.t0);
          case 14:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 11]]);
    }));
    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
};
var getAllUsersService = function getAllUsersService() {
  return new Promise(/*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(resolve, reject) {
      var user;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            user = "";
            _context6.next = 4;
            return _index["default"].User.findAll({
              attributes: {
                exclude: ["password"]
              }
            });
          case 4:
            user = _context6.sent;
            resolve(user);
            _context6.next = 11;
            break;
          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](0);
            reject(_context6.t0);
          case 11:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 8]]);
    }));
    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var editUserService = function editUserService(data) {
  return new Promise(/*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
      var user;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            if (!data.id) {
              resolve({
                errCode: 2,
                errMessage: "Missing parameter"
              });
            }
            _context7.next = 4;
            return _index["default"].User.findOne({
              where: {
                id: data.id
              },
              raw: false
            });
          case 4:
            user = _context7.sent;
            if (!user) {
              _context7.next = 15;
              break;
            }
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.phoneNumber = data.phoneNumber;
            user.roleId = data.roleId;
            _context7.next = 12;
            return user.save();
          case 12:
            resolve({
              errCode: 0,
              errMessage: "Success!!!!"
            });
            _context7.next = 16;
            break;
          case 15:
            resolve({
              errCode: 3,
              errMessage: "id isnt exist"
            });
          case 16:
            _context7.next = 21;
            break;
          case 18:
            _context7.prev = 18;
            _context7.t0 = _context7["catch"](0);
            reject(_context7.t0);
          case 21:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 18]]);
    }));
    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());
};
var getAllCodeService = function getAllCodeService(typeInput) {
  return new Promise(/*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(resolve, reject) {
      var res, allCode;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            if (typeInput) {
              _context8.next = 5;
              break;
            }
            resolve({
              errCode: 2,
              errMessage: "Missing parameter"
            });
            _context8.next = 12;
            break;
          case 5:
            res = {};
            _context8.next = 8;
            return _index["default"].AllCode.findAll({
              where: {
                type: typeInput
              }
            });
          case 8:
            allCode = _context8.sent;
            res.errCode = 0;
            res.data = allCode;
            resolve(res);
          case 12:
            _context8.next = 17;
            break;
          case 14:
            _context8.prev = 14;
            _context8.t0 = _context8["catch"](0);
            reject(_context8.t0);
          case 17:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 14]]);
    }));
    return function (_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }());
};
var createUserService = function createUserService(inputData) {
  return new Promise(/*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
      var check, hashPasswordFromBcrypt, user, token;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return checkEmail(inputData.email);
          case 3:
            check = _context9.sent;
            if (!(check == true)) {
              _context9.next = 8;
              break;
            }
            resolve({
              errCode: 3,
              errMessage: "Email is already in use"
            });
            _context9.next = 16;
            break;
          case 8:
            _context9.next = 10;
            return hashPassword(inputData.password);
          case 10:
            hashPasswordFromBcrypt = _context9.sent;
            _context9.next = 13;
            return _index["default"].User.create({
              firstName: inputData.firstName,
              lastName: inputData.lastName,
              phoneNumber: inputData.phoneNumber,
              email: inputData.email,
              password: hashPasswordFromBcrypt,
              roleId: inputData.roleId
            });
          case 13:
            user = _context9.sent;
            token = user && _jsonwebtoken["default"].sign({
              email: user.email
            }, process.env.SECRET_JWT, {
              expiresIn: "2d"
            });
            resolve({
              errCode: 0,
              errMessage: "Register success!!!",
              token: token || null
            });
          case 16:
            _context9.next = 21;
            break;
          case 18:
            _context9.prev = 18;
            _context9.t0 = _context9["catch"](0);
            reject(_context9.t0);
          case 21:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 18]]);
    }));
    return function (_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var deleteUser = function deleteUser(userId) {
  return new Promise(/*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(resolve, reject) {
      var foundUser;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return _index["default"].User.findOne({
              where: {
                id: userId
              }
            });
          case 3:
            foundUser = _context10.sent;
            if (!foundUser) {
              resolve({
                errCode: 2,
                message: "can not find user"
              });
            }
            _context10.next = 7;
            return _index["default"].User.destroy({
              where: {
                id: userId
              }
            });
          case 7:
            resolve({
              errCode: 0,
              message: "delete success!!"
            });
            _context10.next = 13;
            break;
          case 10:
            _context10.prev = 10;
            _context10.t0 = _context10["catch"](0);
            reject(_context10.t0);
          case 13:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 10]]);
    }));
    return function (_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }());
};
var getUserOrderService = function getUserOrderService(userId) {
  return new Promise(/*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(resolve, reject) {
      var order;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            if (userId) {
              _context11.next = 6;
              break;
            }
            resolve({
              errCode: 2,
              message: "Missing parameter"
            });
            return _context11.abrupt("return");
          case 6:
            _context11.next = 8;
            return _index["default"].Order.findAll({
              where: {
                userId: userId
              },
              include: [{
                model: _index["default"].AllCode,
                as: "paymentData",
                attributes: ["value"]
              }, {
                model: _index["default"].AllCode,
                as: "statusDt",
                attributes: ["value"]
              }, {
                model: _index["default"].Transaction,
                include: [{
                  model: _index["default"].Product,
                  attributes: ["title", "image"]
                }]
              }]
            });
          case 8:
            order = _context11.sent;
            resolve({
              errCode: 0,
              errMessage: "success",
              order: order
            });
          case 10:
            _context11.next = 15;
            break;
          case 12:
            _context11.prev = 12;
            _context11.t0 = _context11["catch"](0);
            reject(_context11.t0);
          case 15:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 12]]);
    }));
    return function (_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }());
};
var getAllProductByCategoryService = function getAllProductByCategoryService(categoryId) {
  return new Promise(/*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(resolve, reject) {
      var product;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            if (categoryId) {
              _context12.next = 6;
              break;
            }
            resolve({
              errCode: 2,
              message: "Missing parameter"
            });
            return _context12.abrupt("return");
          case 6:
            _context12.next = 8;
            return _index["default"].Product.findAll({
              where: {
                categoryId: categoryId
              },
              include: [{
                model: _index["default"].AllCode,
                as: "statusData",
                attributes: ["value"]
              }]
            });
          case 8:
            product = _context12.sent;
            resolve({
              errCode: 0,
              errMessage: "success",
              data: product
            });
          case 10:
            _context12.next = 15;
            break;
          case 12:
            _context12.prev = 12;
            _context12.t0 = _context12["catch"](0);
            reject(_context12.t0);
          case 15:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[0, 12]]);
    }));
    return function (_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }());
};
module.exports = {
  registerService: registerService,
  loginService: loginService,
  getAllUsersService: getAllUsersService,
  editUserService: editUserService,
  getAllCodeService: getAllCodeService,
  createUserService: createUserService,
  deleteUser: deleteUser,
  getAllPageUsersService: getAllPageUsersService,
  getUserOrderService: getUserOrderService,
  getAllProductByCategoryService: getAllProductByCategoryService
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// this module
var Main = {};

// clickability -------------------------------
Main.clickability = {};
Main.clickability.errors = {
  badCredentials: "PERMISSION_DENIED",
  duplicateUser: "DUPLICATE_VALUE",
  incomplete: "MISSING_VALUE",
  noResults: "ITEM_NOT_FOUND"
};

// EXPORT
// =============================================================================
exports.default = Main;
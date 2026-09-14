import { r as __toESM } from "./rolldown-runtime-DUp30N8C.js";
import { C as vShow, Cn as withDirectives, Ft as onMounted, G as createBlock, K as createCommentVNode, Kn as ref, M as Fragment, Ot as nextTick, U as computed, Vt as openBlock, W as createBaseVNode, ar as normalizeClass, cr as toDisplayString, gn as watch, nr as unref, nt as defineComponent, p as render$1, pt as h, q as createElementBlock, sr as normalizeStyle, ut as getCurrentInstance, zt as onUnmounted } from "./vue.runtime.esm-bundler-D-XhGYqL.js";
import { n as __name } from "./chunk-Y2CYZVJY-BeyD3uSL.js";
import { B as setLogLevel, R as select_default, z as log } from "./src-nnofB4Gp.js";
import { $ as updateSiteConfig, C as getDiagramLoader, E as getSiteConfig, I as reset, J as setSiteConfig, K as setDiagramConfigScope, L as sanitizeCss, N as registerDiagram, P as registerLazyLoadedDiagrams, Q as themes_default, S as getDiagram, T as getEffectiveHtmlLabels, V as saveConfigFromInitialize, W as setConfig, Z as styles_default, _ as frontMatterRegex, b as getConfig, c as configureSvgSize, et as purify, f as defaultConfig_default, g as evaluate, l as cssStyleSheetToString, m as detectors, n as addDirective, p as detectType, r as assignWithDepth_default, t as UnknownDiagramError, u as defaultConfig } from "./chunk-O7XYJQB3-mKDgYvQm.js";
import { S as isBuffer, a as decodeEntities, f as isDetailedError, g as utils_default, h as removeDirectives, i as cleanAndMerge, o as encodeEntities, v as isTypedArray, x as isArrayLike, y as isArguments } from "./chunk-ZIGJFQKS-CX9G_8OE.js";
import { t as selectSvgElement } from "./chunk-6AEJRKK7-CeavfKAn.js";
import { n as load, t as JSON_SCHEMA } from "./chunk-LNGE3PJU-CO8MhpBx.js";
import "./chunk-7PRAP22T-BsZhkbcM.js";
import { r as registerIconPacks } from "./chunk-742MDFTN-DsvLQSVM.js";
import { a as dedent } from "./chunk-MBY4JIJT-DQOOXU90.js";
import "./chunk-7INBJB4K-Cqr6ftBk.js";
import "./chunk-5DYCD2WN-CR4S9APN.js";
import "./chunk-UA2S7LBM-qM4-1ylw.js";
import "./chunk-Z7XXMR3K-Dp6XDiuE.js";
import { n as registerLayoutLoaders } from "./chunk-GNY47TPC-5TUZhvc7.js";
//#region node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/_internal/isPrototype.mjs
function isPrototype(value) {
	const constructor = value?.constructor;
	return value === (typeof constructor === "function" ? constructor.prototype : Object.prototype);
}
//#endregion
//#region node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/predicate/isEmpty.mjs
/**
* Checks if a given value is empty.
*
* - If the given value is a string, checks if it is an empty string.
* - If the given value is an array, `Map`, or `Set`, checks if its size is 0.
* - If the given value is an [array-like object](../predicate/isArrayLike.md), checks if its length is 0.
* - If the given value is an object, checks if it is an empty object with no properties.
* - Primitive values (booleans, numbers, or bigints) are considered empty.
*
* @param [value] - The value to check.
* @returns `true` if the value is empty, `false` otherwise.
*
* @example
* isEmpty(); // true
* isEmpty(null); // true
* isEmpty(""); // true
* isEmpty([]); // true
* isEmpty({}); // true
* isEmpty(new Map()); // true
* isEmpty(new Set()); // true
* isEmpty("hello"); // false
* isEmpty([1, 2, 3]); // false
* isEmpty({ a: 1 }); // false
* isEmpty(new Map([["key", "value"]])); // false
* isEmpty(new Set([1, 2, 3])); // false
*/
function isEmpty(value) {
	if (value == null) return true;
	if (isArrayLike(value)) {
		if (typeof value.splice !== "function" && typeof value !== "string" && !isBuffer(value) && !isTypedArray(value) && !isArguments(value)) return false;
		return value.length === 0;
	}
	if (typeof value === "object" || typeof value === "function") {
		if (value instanceof Map || value instanceof Set) return value.size === 0;
		const keys = Object.keys(value);
		if (isPrototype(value)) return keys.filter((x) => x !== "constructor").length === 0;
		return keys.length === 0;
	}
	return true;
}
//#endregion
//#region node_modules/.pnpm/stylis@4.4.0/node_modules/stylis/src/Enum.js
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var NAMESPACE = "@namespace";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
//#endregion
//#region node_modules/.pnpm/stylis@4.4.0/node_modules/stylis/src/Utility.js
/**
* @param {number}
* @return {number}
*/
var abs = Math.abs;
/**
* @param {number}
* @return {string}
*/
var from = String.fromCharCode;
/**
* @param {string} value
* @return {string}
*/
function trim(value) {
	return value.trim();
}
/**
* @param {string} value
* @param {(string|RegExp)} pattern
* @param {string} replacement
* @return {string}
*/
function replace(value, pattern, replacement) {
	return value.replace(pattern, replacement);
}
/**
* @param {string} value
* @param {number} index
* @return {number}
*/
function charat(value, index) {
	return value.charCodeAt(index) | 0;
}
/**
* @param {string} value
* @param {number} begin
* @param {number} end
* @return {string}
*/
function substr(value, begin, end) {
	return value.slice(begin, end);
}
/**
* @param {string} value
* @return {number}
*/
function strlen(value) {
	return value.length;
}
/**
* @param {any[]} value
* @return {number}
*/
function sizeof(value) {
	return value.length;
}
/**
* @param {any} value
* @param {any[]} array
* @return {any}
*/
function append(value, array) {
	return array.push(value), value;
}
//#endregion
//#region node_modules/.pnpm/stylis@4.4.0/node_modules/stylis/src/Tokenizer.js
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
/**
* @param {string} value
* @param {object | null} root
* @param {object | null} parent
* @param {string} type
* @param {string[] | string} props
* @param {object[] | string} children
* @param {object[]} siblings
* @param {number} length
*/
function node(value, root, parent, type, props, children, length, siblings) {
	return {
		value,
		root,
		parent,
		type,
		props,
		children,
		line,
		column,
		length,
		return: "",
		siblings
	};
}
/**
* @return {number}
*/
function char() {
	return character;
}
/**
* @return {number}
*/
function prev() {
	character = position > 0 ? charat(characters, --position) : 0;
	if (column--, character === 10) column = 1, line--;
	return character;
}
/**
* @return {number}
*/
function next() {
	character = position < length ? charat(characters, position++) : 0;
	if (column++, character === 10) column = 1, line++;
	return character;
}
/**
* @return {number}
*/
function peek() {
	return charat(characters, position);
}
/**
* @return {number}
*/
function caret() {
	return position;
}
/**
* @param {number} begin
* @param {number} end
* @return {string}
*/
function slice(begin, end) {
	return substr(characters, begin, end);
}
/**
* @param {number} type
* @return {number}
*/
function token(type) {
	switch (type) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32: return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125: return 4;
		case 58: return 3;
		case 34:
		case 39:
		case 40:
		case 91: return 2;
		case 41:
		case 93: return 1;
	}
	return 0;
}
/**
* @param {string} value
* @return {any[]}
*/
function alloc(value) {
	return line = column = 1, length = strlen(characters = value), position = 0, [];
}
/**
* @param {any} value
* @return {any}
*/
function dealloc(value) {
	return characters = "", value;
}
/**
* @param {number} type
* @return {string}
*/
function delimit(type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
/**
* @param {number} type
* @return {string}
*/
function whitespace(type) {
	while (character = peek()) if (character < 33) next();
	else break;
	return token(type) > 2 || token(character) > 3 ? "" : " ";
}
/**
* @param {number} index
* @param {number} count
* @return {string}
*/
function escaping(index, count) {
	while (--count && next()) if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97) break;
	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
/**
* @param {number} type
* @return {number}
*/
function delimiter(type) {
	while (next()) switch (character) {
		case type: return position;
		case 34:
		case 39:
			if (type !== 34 && type !== 39) delimiter(character);
			break;
		case 40:
			if (type === 41) delimiter(type);
			break;
		case 92: next();
	}
	return position;
}
/**
* @param {number} type
* @param {number} index
* @return {number}
*/
function commenter(type, index) {
	while (next()) if (type + character === 57) break;
	else if (type + character === 84 && peek() === 47) break;
	return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
/**
* @param {number} index
* @return {string}
*/
function identifier(index) {
	while (!token(peek())) next();
	return slice(index, position);
}
//#endregion
//#region node_modules/.pnpm/stylis@4.4.0/node_modules/stylis/src/Parser.js
/**
* @param {string} value
* @return {object[]}
*/
function compile(value) {
	return dealloc(parse$1("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
/**
* @param {string} value
* @param {object} root
* @param {object?} parent
* @param {string[]} rule
* @param {string[]} rules
* @param {string[]} rulesets
* @param {number[]} pseudo
* @param {number[]} points
* @param {string[]} declarations
* @return {object}
*/
function parse$1(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0;
	var offset = 0;
	var length = pseudo;
	var atrule = 0;
	var property = 0;
	var previous = 0;
	var variable = 1;
	var scanning = 1;
	var ampersand = 1;
	var parens = 0;
	var character = 0;
	var type = "";
	var props = rules;
	var children = rulesets;
	var reference = rule;
	var characters = type;
	while (scanning) switch (previous = character, character = next()) {
		case 40:
			if (previous != 108 && charat(characters, length - 1) == 58) parens++, characters += "(";
			else characters += delimit(character);
			break;
		case 41:
			parens--, characters += ")";
			break;
		case 34:
		case 39:
		case 91:
			characters += delimit(character);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			if (parens > 0) {
				characters += from(character);
				break;
			}
			characters += whitespace(previous);
			break;
		case 92:
			characters += escaping(caret() - 1, 7);
			continue;
		case 47:
			switch (peek()) {
				case 42:
				case 47:
					append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
					if ((token(previous || 1) == 5 || token(peek() || 1) == 5) && strlen(characters) && substr(characters, -1, void 0) !== " ") characters += " ";
					break;
				default: characters += "/";
			}
			break;
		case 123 * variable: points[index++] = strlen(characters) * ampersand;
		case 125 * variable:
		case 59:
		case 0:
			if (parens > 0 && character) {
				characters += from(character);
				break;
			}
			switch (character) {
				case 0:
				case 125: scanning = 0;
				case 59 + offset:
					if (ampersand == -1) characters = replace(characters, /\f/g, "");
					if (property > 0 && (strlen(characters) - length || variable === 0)) append(property > 32 ? declaration(characters + ";", rule, parent, length - 1, declarations) : declaration(replace(characters, " ", "") + ";", rule, parent, length - 2, declarations), declarations);
					break;
				case 59: characters += ";";
				default:
					append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length, rulesets), rulesets);
					if (character === 123) if (offset === 0) parse$1(characters, root, reference, reference, props, rulesets, length, points, children);
					else {
						switch (atrule) {
							case 99: if (charat(characters, 3) === 110) break;
							case 108: if (charat(characters, 2) === 97) break;
							default: offset = 0;
							case 100:
							case 109:
							case 115:
						}
						if (offset) parse$1(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length, children), children), rules, children, length, points, rule ? props : children);
						else parse$1(characters, reference, reference, reference, [""], children, 0, points, children);
					}
			}
			index = offset = property = 0, variable = ampersand = 1, type = characters = "", length = pseudo;
			break;
		case 58: length = 1 + strlen(characters), property = previous;
		default:
			if (variable < 1) {
				if (character == 123) --variable;
				else if (character == 125 && variable++ == 0 && prev() == 125) continue;
			}
			switch (characters += from(character), character * variable) {
				case 38:
					ampersand = offset > 0 ? 1 : (characters += "\f", -1);
					break;
				case 44:
					if (parens > 0) break;
					points[index++] = (strlen(characters) - 1) * ampersand, ampersand = 1;
					break;
				case 64:
					if (peek() === 45) characters += delimit(next());
					atrule = peek(), offset = length = strlen(type = characters += identifier(caret())), character++;
					break;
				case 45: if (previous === 45 && strlen(characters) == 2) variable = 0;
			}
	}
	return rulesets;
}
/**
* @param {string} value
* @param {object} root
* @param {object?} parent
* @param {number} index
* @param {number} offset
* @param {string[]} rules
* @param {number[]} points
* @param {string} type
* @param {string[]} props
* @param {string[]} children
* @param {number} length
* @param {object[]} siblings
* @return {object}
*/
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length, siblings) {
	var post = offset - 1;
	var rule = offset === 0 ? rules : [""];
	var size = sizeof(rule);
	for (var i = 0, j = 0, k = 0; i < index; ++i) for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x) if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x]))) props[k++] = z;
	return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length, siblings);
}
/**
* @param {number} value
* @param {object} root
* @param {object?} parent
* @param {object[]} siblings
* @return {object}
*/
function comment(value, root, parent, siblings) {
	return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
}
/**
* @param {string} value
* @param {object} root
* @param {object?} parent
* @param {number} length
* @param {object[]} siblings
* @return {object}
*/
function declaration(value, root, parent, length, siblings) {
	return node(value, root, parent, DECLARATION, substr(value, 0, length), substr(value, length + 1, -1), length, siblings);
}
//#endregion
//#region node_modules/.pnpm/stylis@4.4.0/node_modules/stylis/src/Serializer.js
/**
* @param {object[]} children
* @param {function} callback
* @return {string}
*/
function serialize(children, callback) {
	var output = "";
	for (var i = 0; i < children.length; i++) output += callback(children[i], i, children, callback) || "";
	return output;
}
/**
* @param {object} element
* @param {number} index
* @param {object[]} children
* @param {function} callback
* @return {string}
*/
function stringify(element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break;
		case IMPORT:
		case NAMESPACE:
		case DECLARATION: return element.return = element.return || element.value;
		case COMMENT: return "";
		case KEYFRAMES: return element.return = element.value + "{" + serialize(element.children, callback) + "}";
		case RULESET: if (!strlen(element.value = element.props.join(","))) return "";
	}
	return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
//#endregion
//#region node_modules/.pnpm/stylis@4.4.0/node_modules/stylis/src/Middleware.js
/**
* @param {function[]} collection
* @return {function}
*/
function middleware(collection) {
	var length = sizeof(collection);
	return function(element, index, children, callback) {
		var output = "";
		for (var i = 0; i < length; i++) output += collection[i](element, index, children, callback) || "";
		return output;
	};
}
//#endregion
//#region node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/mermaid.core.mjs
var id = "c4";
var c4Detector_default = {
	id,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./c4Diagram-YGBWAQC7-CafYv4kh.js");
		return {
			id,
			diagram: diagram2
		};
	}, "loader")
};
var id2 = "flowchart-v2";
var flowDetector_v2_default = {
	id: id2,
	detector: /* @__PURE__ */ __name((txt) => /^\s*(graph|flowchart)/.test(txt), "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./flowDiagram-KWPJA3E3--DncfDjt.js");
		return {
			id: id2,
			diagram: diagram2
		};
	}, "loader")
};
var id3 = "agentflow";
var afDetector_default = {
	id: id3,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*agentflow-beta\b/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./diagram-22UHCM2B-6gRTjGAu.js");
		return {
			id: id3,
			diagram: diagram2
		};
	}, "loader")
};
var id4 = "swimlane";
var detector_default = {
	id: id4,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*swimlane-beta\b/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./swimlanesDiagram-TC7HE7FX-DaHhB5Yy.js");
		return {
			id: id4,
			diagram: diagram2
		};
	}, "loader")
};
var id5 = "er";
var erDetector_default = {
	id: id5,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*erDiagram/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./erDiagram-OPXOYQCR-DrfgSX9V.js");
		return {
			id: id5,
			diagram: diagram2
		};
	}, "loader")
};
var id6 = "gitGraph";
var gitGraphDetector_default = {
	id: id6,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*gitGraph/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./gitGraphDiagram-X574FWY7-CmwtYnYo.js");
		return {
			id: id6,
			diagram: diagram2
		};
	}, "loader")
};
var id7 = "gantt";
var ganttDetector_default = {
	id: id7,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*gantt/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./ganttDiagram-FUAMR5RP-C9AIAyFu.js");
		return {
			id: id7,
			diagram: diagram2
		};
	}, "loader")
};
var id8 = "info";
var info = {
	id: id8,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*info/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./infoDiagram-VRGFBTTK-mXAQz1n5.js");
		return {
			id: id8,
			diagram: diagram2
		};
	}, "loader")
};
var id9 = "pie";
var pie = {
	id: id9,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*pie/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./pieDiagram-5QR66LMP-nbTOEfTY.js");
		return {
			id: id9,
			diagram: diagram2
		};
	}, "loader")
};
var id10 = "quadrantChart";
var quadrantDetector_default = {
	id: id10,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*quadrantChart/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./quadrantDiagram-O4NWA36T-C5XNB65g.js");
		return {
			id: id10,
			diagram: diagram2
		};
	}, "loader")
};
var id11 = "xychart";
var xychartDetector_default = {
	id: id11,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*xychart(-beta)?/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./xychartDiagram-PMCCYNJV-DJ-hxRdR.js");
		return {
			id: id11,
			diagram: diagram2
		};
	}, "loader")
};
var id12 = "requirement";
var requirementDetector_default = {
	id: id12,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*requirement(Diagram)?/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./requirementDiagram-PLB6GJNP-CXBUL5KU.js");
		return {
			id: id12,
			diagram: diagram2
		};
	}, "loader")
};
var id13 = "sequence";
var sequenceDetector_default = {
	id: id13,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*sequenceDiagram/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./sequenceDiagram-PO4LG4MO-m2XbGMjj.js");
		return {
			id: id13,
			diagram: diagram2
		};
	}, "loader")
};
var id14 = "classDiagram";
var classDetector_V2_default = {
	id: id14,
	detector: /* @__PURE__ */ __name((txt) => /^\s*classDiagram/.test(txt), "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./classDiagram-v2-NBCMYWYE-BOFlNvRN.js");
		return {
			id: id14,
			diagram: diagram2
		};
	}, "loader")
};
var id15 = "stateDiagram";
var stateDetector_V2_default = {
	id: id15,
	detector: /* @__PURE__ */ __name((txt) => /^\s*stateDiagram/.test(txt), "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./stateDiagram-v2-GCMORJYK-DouEOSDv.js");
		return {
			id: id15,
			diagram: diagram2
		};
	}, "loader")
};
var id16 = "journey";
var journeyDetector_default = {
	id: id16,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*journey/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./journeyDiagram-ZHPQQLJL-BmRSNcJM.js");
		return {
			id: id16,
			diagram: diagram2
		};
	}, "loader")
};
var renderer = { draw: /* @__PURE__ */ __name((_text, id38, version) => {
	log.debug("rendering svg for syntax error\n");
	const svg = selectSvgElement(id38);
	const g = svg.append("g");
	svg.attr("viewBox", "0 0 2412 512");
	configureSvgSize(svg, 100, 512, true);
	g.append("path").attr("class", "error-icon").attr("d", "m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z");
	g.append("path").attr("class", "error-icon").attr("d", "m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z");
	g.append("path").attr("class", "error-icon").attr("d", "m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z");
	g.append("path").attr("class", "error-icon").attr("d", "m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z");
	g.append("path").attr("class", "error-icon").attr("d", "m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z");
	g.append("path").attr("class", "error-icon").attr("d", "m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z");
	g.append("text").attr("class", "error-text").attr("x", 1440).attr("y", 250).attr("font-size", "150px").style("text-anchor", "middle").text("Syntax error in text");
	g.append("text").attr("class", "error-text").attr("x", 1250).attr("y", 400).attr("font-size", "100px").style("text-anchor", "middle").text(`mermaid version ${version}`);
}, "draw") };
var errorRenderer_default = renderer;
var errorDiagram_default = {
	db: {},
	renderer,
	parser: { parse: /* @__PURE__ */ __name(() => {}, "parse") }
};
var id17 = "flowchart-elk";
var detector_default2 = {
	id: id17,
	detector: /* @__PURE__ */ __name((txt, config = {}) => {
		if (/^\s*flowchart-elk/.test(txt)) {
			config.layout = "elk";
			return true;
		}
		return false;
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./flowDiagram-KWPJA3E3--DncfDjt.js");
		return {
			id: id17,
			diagram: diagram2
		};
	}, "loader")
};
var id18 = "timeline";
var detector_default3 = {
	id: id18,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*timeline/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./timeline-definition-EJHVYXUP-DXXwl27I.js");
		return {
			id: id18,
			diagram: diagram2
		};
	}, "loader")
};
var id19 = "mindmap";
var detector_default4 = {
	id: id19,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*mindmap/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./mindmap-definition-NLK3R4M7-B6irLuz0.js");
		return {
			id: id19,
			diagram: diagram2
		};
	}, "loader")
};
var id20 = "kanban";
var detector_default5 = {
	id: id20,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*kanban/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./kanban-definition-PNTS6WVX-B42UvfKR.js");
		return {
			id: id20,
			diagram: diagram2
		};
	}, "loader")
};
var id21 = "sankey";
var sankeyDetector_default = {
	id: id21,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*sankey(-beta)?/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./sankeyDiagram-IPEJSGJF-mMYv1iWH.js");
		return {
			id: id21,
			diagram: diagram2
		};
	}, "loader")
};
var id22 = "packet";
var packet = {
	id: id22,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*packet(-beta)?/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./diagram-MLGK6HIB-CeZEYX1c.js");
		return {
			id: id22,
			diagram: diagram2
		};
	}, "loader")
};
var id23 = "radar";
var radar = {
	id: id23,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*radar-beta/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./diagram-MPIPVDR6-C_BVop9W.js");
		return {
			id: id23,
			diagram: diagram2
		};
	}, "loader")
};
var id24 = "block";
var blockDetector_default = {
	id: id24,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*block(-beta)?/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./blockDiagram-BEXU5L5S-DX-KMglh.js");
		return {
			id: id24,
			diagram: diagram2
		};
	}, "loader")
};
var id25 = "treeView";
var detector_default6 = {
	id: id25,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*treeView-beta/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./diagram-CDSNMT55-CFp7dtrv.js");
		return {
			id: id25,
			diagram: diagram2
		};
	}, "loader")
};
var id26 = "architecture";
var architectureDetector_default = {
	id: id26,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*architecture/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./architectureDiagram-NJMV4G6O-Cb6qEDcW.js");
		return {
			id: id26,
			diagram: diagram2
		};
	}, "loader")
};
var id27 = "eventmodeling";
var detector_default7 = {
	id: id27,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*eventmodeling/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./diagram-ATOU4E4O-3sPSBwPz.js");
		return {
			id: id27,
			diagram: diagram2
		};
	}, "loader")
};
var id28 = "ishikawa";
var ishikawa = {
	id: id28,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*ishikawa(-beta)?\b/i.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./ishikawaDiagram-OU5B5YK6-WjXxJhpk.js");
		return {
			id: id28,
			diagram: diagram2
		};
	}, "loader")
};
var id29 = "venn";
var vennDetector_default = {
	id: id29,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*venn-beta/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./vennDiagram-UO4OBE2U-DTNBHQ4M.js");
		return {
			id: id29,
			diagram: diagram2
		};
	}, "loader")
};
var id30 = "treemap";
var treemap = {
	id: id30,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*treemap/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./diagram-3UASUU5V-CLSn49_Z.js");
		return {
			id: id30,
			diagram: diagram2
		};
	}, "loader")
};
var id31 = "usecase";
var usecase = {
	id: id31,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*usecase-beta(?:\s|$)/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./usecaseDiagram-POWQR4AR-CH_8ba1P.js");
		return {
			id: id31,
			diagram: diagram2
		};
	}, "loader")
};
var id32 = "wardley";
var wardleyDetector_default = {
	id: id32,
	detector: /* @__PURE__ */ __name((text) => {
		return /^\s*wardley-beta/i.test(text);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./wardleyDiagram-VNRHLVJA-DGX69cwk.js");
		return {
			id: id32,
			diagram: diagram2
		};
	}, "loader")
};
var id33 = "cynefin";
var cynefin = {
	id: id33,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*cynefin-beta(?:[\s:]|$)/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./cynefinDiagram-VND7K2PF-Bv-q8Z6j.js");
		return {
			id: id33,
			diagram: diagram2
		};
	}, "loader")
};
var id34 = "railroad";
var railroad = {
	id: id34,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*railroad-beta/i.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./railroadDiagram-XR7U4H2S-DRcX1AUT.js");
		return {
			id: id34,
			diagram: diagram2
		};
	}, "loader")
};
var id35 = "railroadEbnf";
var railroadEbnf = {
	id: id35,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*railroad-ebnf-beta/i.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./ebnfDiagram-ZINNZB2B-BYMTTINc.js");
		return {
			id: id35,
			diagram: diagram2
		};
	}, "loader")
};
var id36 = "railroadAbnf";
var railroadAbnf = {
	id: id36,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*railroad-abnf-beta/i.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./abnfDiagram-O67JEVCF-fQi3gWUk.js");
		return {
			id: id36,
			diagram: diagram2
		};
	}, "loader")
};
var id37 = "railroadPeg";
var railroadPeg = {
	id: id37,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*railroad-peg-beta/i.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./pegDiagram-GJSIUBJH-DoNmM86k.js");
		return {
			id: id37,
			diagram: diagram2
		};
	}, "loader")
};
var hasLoadedDiagrams = false;
var addDiagrams = /* @__PURE__ */ __name(() => {
	if (hasLoadedDiagrams) return;
	hasLoadedDiagrams = true;
	registerDiagram("error", errorDiagram_default, (text) => {
		return text.toLowerCase().trim() === "error";
	});
	registerDiagram("---", {
		db: { clear: /* @__PURE__ */ __name(() => {}, "clear") },
		styles: {},
		renderer: { draw: /* @__PURE__ */ __name(() => {}, "draw") },
		parser: { parse: /* @__PURE__ */ __name(() => {
			throw new Error("Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with un-indented `---` blocks");
		}, "parse") },
		init: /* @__PURE__ */ __name(() => null, "init")
	}, (text) => {
		return text.toLowerCase().trimStart().startsWith("---");
	});
	registerLazyLoadedDiagrams(detector_default2, detector_default4, architectureDetector_default);
	registerLazyLoadedDiagrams(afDetector_default, c4Detector_default, detector_default5, classDetector_V2_default, erDetector_default, ganttDetector_default, info, pie, requirementDetector_default, sequenceDetector_default, detector_default, flowDetector_v2_default, detector_default3, gitGraphDetector_default, stateDetector_V2_default, journeyDetector_default, quadrantDetector_default, sankeyDetector_default, packet, xychartDetector_default, blockDetector_default, detector_default7, detector_default6, radar, ishikawa, treemap, railroad, railroadEbnf, railroadAbnf, railroadPeg, vennDetector_default, wardleyDetector_default, cynefin, usecase);
}, "addDiagrams");
var loadRegisteredDiagrams = /* @__PURE__ */ __name(async () => {
	log.debug(`Loading registered diagrams`);
	const failed = (await Promise.allSettled(Object.entries(detectors).map(async ([key, { detector: detector38, loader: loader38 }]) => {
		if (!loader38) return;
		try {
			getDiagram(key);
		} catch {
			try {
				const { diagram: diagram2, id: id38 } = await loader38();
				registerDiagram(id38, diagram2, detector38);
			} catch (err) {
				log.error(`Failed to load external diagram with key ${key}. Removing from detectors.`);
				delete detectors[key];
				throw err;
			}
		}
	}))).filter((result) => result.status === "rejected");
	if (failed.length > 0) {
		log.error(`Failed to load ${failed.length} external diagrams`);
		for (const res of failed) log.error(res);
		throw new Error(`Failed to load ${failed.length} external diagrams`);
	}
}, "loadRegisteredDiagrams");
var SVG_ROLE = "graphics-document document";
function setA11yDiagramInfo(svg, diagramType) {
	svg.attr("role", SVG_ROLE);
	if (diagramType !== "") svg.attr("aria-roledescription", diagramType);
}
__name(setA11yDiagramInfo, "setA11yDiagramInfo");
function addSVGa11yTitleDescription(svg, a11yTitle, a11yDesc, baseId) {
	if (svg.insert === void 0) return;
	if (a11yDesc) {
		const descId = `chart-desc-${baseId}`;
		svg.attr("aria-describedby", descId);
		svg.insert("desc", ":first-child").attr("id", descId).text(a11yDesc);
	}
	if (a11yTitle) {
		const titleId = `chart-title-${baseId}`;
		svg.attr("aria-labelledby", titleId);
		svg.insert("title", ":first-child").attr("id", titleId).text(a11yTitle);
	}
}
__name(addSVGa11yTitleDescription, "addSVGa11yTitleDescription");
var Diagram = class _Diagram {
	constructor(type, text, db, parser, renderer2) {
		this.type = type;
		this.text = text;
		this.db = db;
		this.parser = parser;
		this.renderer = renderer2;
	}
	static {
		__name(this, "Diagram");
	}
	static async fromText(codeObjectOrText, metadata = {}) {
		const code = typeof codeObjectOrText === "string" ? {
			raw: codeObjectOrText,
			cleaned: codeObjectOrText
		} : codeObjectOrText;
		const config = getConfig();
		const type = detectType(code.cleaned, config);
		try {
			getDiagram(type);
		} catch {
			const loader38 = getDiagramLoader(type);
			if (!loader38) throw new UnknownDiagramError(`Diagram ${type} not found.`);
			const { id: id38, diagram: diagram2 } = await loader38();
			registerDiagram(id38, diagram2);
		}
		const { db, parser, renderer: renderer2, init: init2 } = getDiagram(type);
		if (parser.parser) parser.parser.yy = db;
		db.clear?.();
		init2?.(config);
		if (metadata.title) db.setDiagramTitle?.(metadata.title);
		let source = code.cleaned;
		if (db.preserveCommentsWhenParsing && code.withComments) {
			const maxTextSize = config.maxTextSize ?? defaultConfig_default.maxTextSize;
			if (code.withComments.length > maxTextSize) log.warn(`Comment-preserving source exceeds maxTextSize (${code.withComments.length} > ${maxTextSize}); parsing the comment-stripped text instead. Reported source positions will not account for comment lines.`);
			else source = code.withComments;
		}
		const textToParse = encodeEntities(source) + "\n";
		if (code.frontmatterLineOffset) db.setFrontmatterLineOffset?.(code.frontmatterLineOffset);
		await parser.parse(textToParse);
		return new _Diagram(type, textToParse, db, parser, renderer2);
	}
	async render(id38, version) {
		await this.renderer.draw(this.text, id38, version, this);
	}
	getParser() {
		return this.parser;
	}
	getType() {
		return this.type;
	}
};
var interactionFunctions = [];
var attachFunctions = /* @__PURE__ */ __name(() => {
	interactionFunctions.forEach((f) => {
		f();
	});
	interactionFunctions = [];
}, "attachFunctions");
var cleanupComments = /* @__PURE__ */ __name((text) => {
	return text.replace(/^\s*%%(?!{)[^\n]+\n?/gm, "").trimStart();
}, "cleanupComments");
function extractFrontMatter(text) {
	const matches = text.match(frontMatterRegex);
	if (!matches) return {
		text,
		metadata: {}
	};
	const indent = matches[1];
	const yamlBody = indent ? matches[2].split("\n").map((line) => line.startsWith(indent) ? line.slice(indent.length) : line).join("\n") : matches[2];
	let parsed = load(yamlBody, { schema: JSON_SCHEMA }) ?? {};
	parsed = typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
	const metadata = {};
	if (parsed.displayMode) metadata.displayMode = parsed.displayMode.toString();
	if (parsed.title) metadata.title = parsed.title.toString();
	if (parsed.config) metadata.config = parsed.config;
	return {
		text: text.slice(matches[0].length),
		metadata
	};
}
__name(extractFrontMatter, "extractFrontMatter");
var cleanupText = /* @__PURE__ */ __name((code) => {
	return code.replace(/\r\n?/g, "\n").replace(/<(\w+)([^>]*)>/g, (match, tag, attributes) => "<" + tag + attributes.replace(/="([^"]*)"/g, "='$1'") + ">");
}, "cleanupText");
var processFrontmatter = /* @__PURE__ */ __name((code) => {
	const { text, metadata } = extractFrontMatter(code);
	const { displayMode, title, config = {} } = metadata;
	if (displayMode) {
		if (!config.gantt) config.gantt = {};
		config.gantt.displayMode = displayMode;
	}
	return {
		title,
		config,
		text
	};
}, "processFrontmatter");
var processDirectives = /* @__PURE__ */ __name((code) => {
	const initDirective = utils_default.detectInit(code) ?? {};
	const wrapDirectives = utils_default.detectDirective(code, "wrap");
	if (Array.isArray(wrapDirectives)) initDirective.wrap = wrapDirectives.some(({ type }) => type === "wrap");
	else if (wrapDirectives?.type === "wrap") initDirective.wrap = true;
	return {
		text: removeDirectives(code),
		directive: initDirective
	};
}, "processDirectives");
function preprocessDiagram(code) {
	const rawCode = code;
	const normalizedCode = cleanupText(code);
	const frontMatterResult = processFrontmatter(normalizedCode);
	const directiveResult = processDirectives(frontMatterResult.text);
	const config = cleanAndMerge(frontMatterResult.config, directiveResult.directive);
	const withComments = directiveResult.text;
	return {
		code: {
			raw: rawCode,
			cleaned: cleanupComments(withComments),
			withComments,
			frontmatterLineOffset: normalizedCode.length > frontMatterResult.text.length ? (normalizedCode.substring(0, normalizedCode.length - frontMatterResult.text.length).match(/\n/g) ?? []).length : 0
		},
		title: frontMatterResult.title,
		config
	};
}
__name(preprocessDiagram, "preprocessDiagram");
function toBase64(str) {
	const utf8Bytes = new TextEncoder().encode(str);
	const utf8Str = Array.from(utf8Bytes, (byte) => String.fromCodePoint(byte)).join("");
	return btoa(utf8Str);
}
__name(toBase64, "toBase64");
var MAX_TEXTLENGTH = 5e4;
var MAX_TEXTLENGTH_EXCEEDED_MSG = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa";
var SECURITY_LVL_SANDBOX = "sandbox";
var SECURITY_LVL_LOOSE = "loose";
var XMLNS_SVG_STD = "http://www.w3.org/2000/svg";
var XMLNS_XLINK_STD = "http://www.w3.org/1999/xlink";
var XMLNS_XHTML_STD = "http://www.w3.org/1999/xhtml";
var IFRAME_WIDTH = "100%";
var IFRAME_HEIGHT = "100%";
var IFRAME_STYLES = "border:0;margin:0;";
var IFRAME_BODY_STYLE = "margin:0";
var IFRAME_SANDBOX_OPTS = "allow-top-navigation-by-user-activation allow-popups";
var IFRAME_NOT_SUPPORTED_MSG = "The \"iframe\" tag is not supported by your browser.";
var DOMPURIFY_TAGS = ["foreignobject"];
var DOMPURIFY_ATTR = ["dominant-baseline"];
function processAndSetConfigs(text) {
	const processed = preprocessDiagram(text);
	reset();
	let diagramType;
	try {
		diagramType = detectType(processed.code.cleaned, getConfig());
	} catch {
		diagramType = void 0;
	}
	setDiagramConfigScope(diagramType);
	addDirective(processed.config ?? {});
	return processed;
}
__name(processAndSetConfigs, "processAndSetConfigs");
async function parse(text, parseOptions) {
	addDiagrams();
	try {
		const { code, config } = processAndSetConfigs(text);
		return {
			diagramType: (await Diagram.fromText(code)).type,
			config
		};
	} catch (error) {
		if (parseOptions?.suppressErrors) return false;
		throw error;
	} finally {
		setDiagramConfigScope(void 0);
	}
}
__name(parse, "parse");
var cssImportantStyles = /* @__PURE__ */ __name((cssClass, element, cssClasses = []) => {
	return `.${cssClass} ${element} ${sanitizeCss(`{ ${cssClasses.join(" !important; ")} !important; }`)}`;
}, "cssImportantStyles");
var createCssStyles = /* @__PURE__ */ __name((config, classDefs = /* @__PURE__ */ new Map()) => {
	const cssStyles = new CSSStyleSheet();
	if (config.fontFamily !== void 0) cssStyles.insertRule(`:root { --mermaid-font-family: ${config.fontFamily}}`, cssStyles.cssRules.length);
	if (config.altFontFamily !== void 0) cssStyles.insertRule(`:root { --mermaid-alt-font-family: ${config.altFontFamily}}`, cssStyles.cssRules.length);
	if (classDefs instanceof Map) {
		const cssElements = getEffectiveHtmlLabels(config) ? ["> *", "span"] : [
			"rect",
			"polygon",
			"ellipse",
			"circle",
			"path"
		];
		classDefs.forEach((styleClassDef) => {
			if (!isEmpty(styleClassDef.styles)) cssElements.forEach((cssElement) => {
				cssStyles.insertRule(cssImportantStyles(styleClassDef.id, cssElement, styleClassDef.styles), cssStyles.cssRules.length);
			});
			if (!isEmpty(styleClassDef.textStyles)) cssStyles.insertRule(cssImportantStyles(styleClassDef.id, "tspan", (styleClassDef?.textStyles || []).map((s) => s.replace("color", "fill"))), cssStyles.cssRules.length);
		});
	}
	let cssString = "";
	if (config.themeCSS !== void 0) {
		if (typeof cssStyles.replaceSync === "function") {
			const themeCssStyleSheet = new CSSStyleSheet();
			themeCssStyleSheet.replaceSync(config.themeCSS);
			cssString = cssStyleSheetToString(themeCssStyleSheet) + "\n";
		} else cssString += `${config.themeCSS}
`;
	}
	return cssString + cssStyleSheetToString(cssStyles);
}, "createCssStyles");
var compileCSS = /* @__PURE__ */ __name((namespace, css) => {
	return serialize(compile(`${namespace}{${css}}`), middleware([/* @__PURE__ */ __name(function addNamespace(element, _index, _children, _callback) {
		if (element.type === "rule" && Array.isArray(element.props)) {
			if (element.parent && element.parent.type === "@keyframes") return;
			element.props = element.props.map((prop) => {
				if (prop === namespace && Array.isArray(element.children) && element.children.every((child) => {
					if (child.type !== "decl") return false;
					return (/* @__PURE__ */ new Set([
						"font-family",
						"font-size",
						"fill"
					])).has(child.props);
				})) return prop;
				if (!((prop.startsWith(`${namespace} `) || prop.startsWith(`${namespace}>`)) && !prop.startsWith(`${namespace} ||`))) return `${namespace} ${prop}`;
				return prop;
			});
		} else if (element.type.startsWith("@")) {
			if (![...[
				"@media",
				"@supports",
				"@layer",
				"@scope",
				"@container",
				"@starting-style"
			], "@keyframes"].includes(element.type)) {
				log.warn(`Removing unsupported at-rule ${element.type} from CSS`);
				element.type = COMMENT;
			}
		}
	}, "addNamespace"), stringify]));
}, "compileCSS");
var createUserStyles = /* @__PURE__ */ __name((config, graphType, classDefs, svgId) => {
	const userCSSstyles = createCssStyles(config, classDefs);
	return compileCSS(svgId, styles_default(graphType, userCSSstyles, {
		...config.themeVariables,
		theme: config.theme,
		look: config.look
	}, svgId));
}, "createUserStyles");
var cleanUpSvgCode = /* @__PURE__ */ __name((svgCode = "", inSandboxMode, useArrowMarkerUrls) => {
	let cleanedUpSvg = svgCode;
	if (!useArrowMarkerUrls && !inSandboxMode) cleanedUpSvg = cleanedUpSvg.replace(/marker-end="url\([\d+./:=?A-Za-z-]*?#/g, "marker-end=\"url(#");
	cleanedUpSvg = decodeEntities(cleanedUpSvg);
	cleanedUpSvg = cleanedUpSvg.replace(/<br>/g, "<br/>");
	return cleanedUpSvg;
}, "cleanUpSvgCode");
var putIntoIFrame = /* @__PURE__ */ __name((svgCode = "", svgElement) => {
	return `<iframe style="width:${IFRAME_WIDTH};height:${svgElement?.viewBox?.baseVal?.height ? svgElement.viewBox.baseVal.height + "px" : IFRAME_HEIGHT};${IFRAME_STYLES}" src="data:text/html;charset=UTF-8;base64,${toBase64(`<body style="${IFRAME_BODY_STYLE}">${svgCode}</body>`)}" sandbox="${IFRAME_SANDBOX_OPTS}">
  ${IFRAME_NOT_SUPPORTED_MSG}
</iframe>`;
}, "putIntoIFrame");
var appendDivSvgG = /* @__PURE__ */ __name((parentRoot, id38, enclosingDivId, divStyle, svgXlink) => {
	const enclosingDiv = parentRoot.append("div");
	enclosingDiv.attr("id", enclosingDivId);
	if (divStyle) enclosingDiv.attr("style", divStyle);
	const svgNode = enclosingDiv.append("svg").attr("id", id38).attr("width", "100%").attr("xmlns", XMLNS_SVG_STD);
	if (svgXlink) svgNode.attr("xmlns:xlink", svgXlink);
	svgNode.append("g");
	return parentRoot;
}, "appendDivSvgG");
function sandboxedIframe(parentNode, iFrameId) {
	return parentNode.append("iframe").attr("id", iFrameId).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
__name(sandboxedIframe, "sandboxedIframe");
var removeExistingElements = /* @__PURE__ */ __name((doc, id38, divId, iFrameId) => {
	doc.getElementById(id38)?.remove();
	doc.getElementById(divId)?.remove();
	doc.getElementById(iFrameId)?.remove();
}, "removeExistingElements");
var renderDiagram = /* @__PURE__ */ __name(async function(id38, text, svgContainingElement) {
	addDiagrams();
	const processed = processAndSetConfigs(text);
	let code = processed.code;
	text = code.cleaned;
	const config = getConfig();
	log.debug(config);
	if (text.length > (config?.maxTextSize ?? MAX_TEXTLENGTH)) {
		text = MAX_TEXTLENGTH_EXCEEDED_MSG;
		code = {
			raw: text,
			cleaned: text
		};
	}
	const idSelector = `#${id38}`;
	const iFrameID = "i" + id38;
	const iFrameID_selector = "#" + iFrameID;
	const enclosingDivID = "d" + id38;
	const enclosingDivID_selector = "#" + enclosingDivID;
	const removeTempElements = /* @__PURE__ */ __name(() => {
		const node = select_default(isSandboxed ? iFrameID_selector : enclosingDivID_selector).node();
		if (node && "remove" in node) node.remove();
	}, "removeTempElements");
	let root = select_default(document.body);
	const isSandboxed = config.securityLevel === SECURITY_LVL_SANDBOX;
	const isLooseSecurityLevel = config.securityLevel === SECURITY_LVL_LOOSE;
	const fontFamily = config.fontFamily;
	if (svgContainingElement !== void 0) {
		if (svgContainingElement) svgContainingElement.innerHTML = "";
		if (isSandboxed) {
			const iframe = sandboxedIframe(select_default(svgContainingElement), iFrameID);
			root = select_default(iframe.nodes()[0].contentDocument.body);
			root.node().style.margin = "0";
		} else root = select_default(svgContainingElement);
		appendDivSvgG(root, id38, enclosingDivID, `font-family: ${fontFamily}`, XMLNS_XLINK_STD);
	} else {
		removeExistingElements(document, id38, enclosingDivID, iFrameID);
		if (isSandboxed) {
			const iframe = sandboxedIframe(select_default(document.body), iFrameID);
			root = select_default(iframe.nodes()[0].contentDocument.body);
			root.node().style.margin = "0";
		} else root = select_default("body");
		appendDivSvgG(root, id38, enclosingDivID);
	}
	let diag;
	let parseEncounteredException;
	try {
		diag = await Diagram.fromText(code, { title: processed.title });
	} catch (error) {
		if (config.suppressErrorRendering) {
			removeTempElements();
			throw error;
		}
		diag = await Diagram.fromText("error");
		parseEncounteredException = error;
	}
	const element = root.select(enclosingDivID_selector).node();
	const diagramType = diag.type;
	const svg = element.firstChild;
	const firstChild = svg.firstChild;
	const diagramClassDefs = diag.renderer.getClasses?.(text, diag);
	const rules = createUserStyles(config, diagramType, diagramClassDefs, idSelector);
	const style1 = document.createElement("style");
	style1.innerHTML = rules;
	svg.insertBefore(style1, firstChild);
	try {
		await diag.renderer.draw(text, id38, "12.0.0", diag);
	} catch (e) {
		if (config.suppressErrorRendering) removeTempElements();
		else errorRenderer_default.draw(text, id38, "12.0.0");
		throw e;
	}
	const svgNode = root.select(`${enclosingDivID_selector} svg`);
	const a11yTitle = diag.db.getAccTitle?.();
	const a11yDescr = diag.db.getAccDescription?.();
	addA11yInfo(diagramType, svgNode, a11yTitle, a11yDescr);
	const svgCode = (/* @__PURE__ */ __name(() => {
		root.select(`[id="${id38}"]`).selectAll("foreignobject > *").attr("xmlns", XMLNS_XHTML_STD);
		let code2 = root.select(enclosingDivID_selector).node().innerHTML;
		log.debug("config.arrowMarkerAbsolute", config.arrowMarkerAbsolute);
		code2 = cleanUpSvgCode(code2, isSandboxed, evaluate(config.arrowMarkerAbsolute));
		if (isSandboxed) {
			const svgEl = root.select(enclosingDivID_selector + " svg").node();
			code2 = putIntoIFrame(code2, svgEl);
		} else if (!isLooseSecurityLevel) code2 = purify.sanitize(code2, {
			ADD_TAGS: DOMPURIFY_TAGS,
			ADD_ATTR: DOMPURIFY_ATTR,
			HTML_INTEGRATION_POINTS: { foreignobject: true }
		});
		attachFunctions();
		return code2;
	}, "serializeSvg"))();
	if (parseEncounteredException) throw parseEncounteredException;
	removeTempElements();
	return {
		diagramType,
		svg: svgCode,
		bindFunctions: diag.db.bindFunctions
	};
}, "renderDiagram");
var render = /* @__PURE__ */ __name(async function(id38, text, svgContainingElement) {
	try {
		return await renderDiagram(id38, text, svgContainingElement);
	} finally {
		setDiagramConfigScope(void 0);
	}
}, "render");
function initialize(userOptions = {}) {
	const options = assignWithDepth_default({}, userOptions);
	if (options?.fontFamily && !options.themeVariables?.fontFamily) {
		if (!options.themeVariables) options.themeVariables = {};
		options.themeVariables.fontFamily = options.fontFamily;
	}
	saveConfigFromInitialize(options);
	const fallbackTheme = defaultConfig.theme;
	if (options?.theme && Object.hasOwn(themes_default, options.theme)) options.themeVariables = themes_default[options.theme].getThemeVariables(options.themeVariables);
	else if (options) {
		if (options.theme != null && options.theme !== "null") options.theme = fallbackTheme;
		options.themeVariables = themes_default[fallbackTheme].getThemeVariables(options.themeVariables);
	}
	const config = typeof options === "object" ? setSiteConfig(options) : getSiteConfig();
	setLogLevel(config.logLevel);
	addDiagrams();
}
__name(initialize, "initialize");
var getDiagramFromText = /* @__PURE__ */ __name((text, metadata = {}) => {
	const { code } = preprocessDiagram(text);
	return Diagram.fromText(code, metadata);
}, "getDiagramFromText");
function addA11yInfo(diagramType, svgNode, a11yTitle, a11yDescr) {
	setA11yDiagramInfo(svgNode, diagramType);
	addSVGa11yTitleDescription(svgNode, a11yTitle, a11yDescr, svgNode.attr("id"));
}
__name(addA11yInfo, "addA11yInfo");
var mermaidAPI = Object.freeze({
	render,
	parse,
	getDiagramFromText,
	initialize,
	getConfig,
	/**
	* @deprecated This function does nothing. It will be overwritten by the next
	*             call to {@link render} or {@link parse}.
	*/
	setConfig,
	getSiteConfig,
	updateSiteConfig,
	reset: /* @__PURE__ */ __name(() => {
		reset();
	}, "reset"),
	globalReset: /* @__PURE__ */ __name(() => {
		reset(defaultConfig);
	}, "globalReset"),
	defaultConfig
});
setLogLevel(getConfig().logLevel);
reset(getConfig());
var handleError = /* @__PURE__ */ __name((error, errors, parseError) => {
	log.warn(error);
	if (isDetailedError(error)) {
		if (parseError) parseError(error.str, error.hash);
		errors.push({
			...error,
			message: error.str,
			error
		});
	} else {
		if (parseError) parseError(error);
		if (error instanceof Error) errors.push({
			str: error.message,
			message: error.message,
			hash: error.name,
			error
		});
	}
}, "handleError");
var run = /* @__PURE__ */ __name(async function(options = { querySelector: ".mermaid" }) {
	try {
		await runThrowsErrors(options);
	} catch (e) {
		if (isDetailedError(e)) log.error(e.str);
		if (mermaid.parseError) mermaid.parseError(e);
		if (!options.suppressErrors) {
			log.error("Use the suppressErrors option to suppress these errors");
			throw e;
		}
	}
}, "run");
var runThrowsErrors = /* @__PURE__ */ __name(async function({ postRenderCallback, querySelector, nodes } = { querySelector: ".mermaid" }) {
	const conf = mermaidAPI.getConfig();
	log.debug(`${!postRenderCallback ? "No " : ""}Callback function found`);
	let nodesToProcess;
	if (nodes) nodesToProcess = nodes;
	else if (querySelector) nodesToProcess = document.querySelectorAll(querySelector);
	else throw new Error("Nodes and querySelector are both undefined");
	log.debug(`Found ${nodesToProcess.length} diagrams`);
	if (conf?.startOnLoad !== void 0) {
		log.debug("Start On Load: " + conf?.startOnLoad);
		mermaidAPI.updateSiteConfig({ startOnLoad: conf?.startOnLoad });
	}
	const idGenerator = new utils_default.InitIDGenerator(conf.deterministicIds, conf.deterministicIDSeed);
	let txt;
	const errors = [];
	for (const element of Array.from(nodesToProcess)) {
		log.info("Rendering diagram: " + element.id);
		if (element.getAttribute("data-processed")) continue;
		element.setAttribute("data-processed", "true");
		const id38 = `mermaid-${idGenerator.next()}`;
		txt = element.innerHTML;
		txt = dedent(utils_default.entityDecode(txt)).trim().replace(/<br\s*\/?>/gi, "<br/>");
		const init2 = utils_default.detectInit(txt);
		if (init2) log.debug("Detected early reinit: ", init2);
		try {
			const { svg, bindFunctions } = await render2(id38, txt, element);
			element.innerHTML = svg;
			if (postRenderCallback) await postRenderCallback(id38);
			if (bindFunctions) bindFunctions(element);
		} catch (error) {
			handleError(error, errors, mermaid.parseError);
		}
	}
	if (errors.length > 0) throw errors[0];
}, "runThrowsErrors");
var initialize2 = /* @__PURE__ */ __name(function(config) {
	mermaidAPI.initialize(config);
}, "initialize");
var init = /* @__PURE__ */ __name(async function(config, nodes, callback) {
	log.warn("mermaid.init is deprecated. Please use run instead.");
	if (config) initialize2(config);
	const runOptions = {
		postRenderCallback: callback,
		querySelector: ".mermaid"
	};
	if (typeof nodes === "string") runOptions.querySelector = nodes;
	else if (nodes) {
		if (nodes instanceof HTMLElement) runOptions.nodes = [nodes];
		else runOptions.nodes = nodes;
	}
	await run(runOptions);
}, "init");
var registerExternalDiagrams = /* @__PURE__ */ __name(async (diagrams, { lazyLoad = true } = {}) => {
	addDiagrams();
	registerLazyLoadedDiagrams(...diagrams);
	if (lazyLoad === false) await loadRegisteredDiagrams();
}, "registerExternalDiagrams");
var contentLoaded = /* @__PURE__ */ __name(function() {
	if (mermaid.startOnLoad) {
		const { startOnLoad } = mermaidAPI.getConfig();
		if (startOnLoad) mermaid.run().catch((err) => log.error("Mermaid failed to initialize", err));
	}
}, "contentLoaded");
if (typeof document !== "undefined") window.addEventListener("load", contentLoaded, false);
var setParseErrorHandler = /* @__PURE__ */ __name(function(parseErrorHandler) {
	mermaid.parseError = parseErrorHandler;
}, "setParseErrorHandler");
var executionQueue = [];
var executionQueueRunning = false;
var executeQueue = /* @__PURE__ */ __name(async () => {
	if (executionQueueRunning) return;
	executionQueueRunning = true;
	while (executionQueue.length > 0) {
		const f = executionQueue.shift();
		if (f) try {
			await f();
		} catch (e) {
			log.error("Error executing queue", e);
		}
	}
	executionQueueRunning = false;
}, "executeQueue");
var parse2 = /* @__PURE__ */ __name(async (text, parseOptions) => {
	return new Promise((resolve, reject) => {
		const performCall = /* @__PURE__ */ __name(() => new Promise((res, rej) => {
			mermaidAPI.parse(text, parseOptions).then((r) => {
				res(r);
				resolve(r);
			}, (e) => {
				log.error("Error parsing", e);
				mermaid.parseError?.(e);
				rej(e);
				reject(e);
			});
		}), "performCall");
		executionQueue.push(performCall);
		executeQueue().catch(reject);
	});
}, "parse");
var render2 = /* @__PURE__ */ __name((id38, text, container) => {
	return new Promise((resolve, reject) => {
		const performCall = /* @__PURE__ */ __name(() => new Promise((res, rej) => {
			mermaidAPI.render(id38, text, container).then((r) => {
				res(r);
				resolve(r);
			}, (e) => {
				log.error("Error parsing", e);
				mermaid.parseError?.(e);
				rej(e);
				reject(e);
			});
		}), "performCall");
		executionQueue.push(performCall);
		executeQueue().catch(reject);
	});
}, "render");
var mermaid = {
	startOnLoad: true,
	mermaidAPI,
	parse: parse2,
	render: render2,
	init,
	run,
	registerExternalDiagrams,
	registerLayoutLoaders,
	initialize: initialize2,
	parseError: void 0,
	contentLoaded,
	setParseErrorHandler,
	detectType,
	registerIconPacks,
	getRegisteredDiagramsMetadata: /* @__PURE__ */ __name(() => {
		return Object.keys(detectors).map((id38) => ({ id: id38 }));
	}, "getRegisteredDiagramsMetadata")
};
var mermaid_default = mermaid;
/*! Check if previously processed */
/*!
* Wait for document loaded before starting the execution
*/
//#endregion
//#region node_modules/.pnpm/vitepress-mermaid-renderer@1.2.2_mermaid@12.0.0_vue@3.5.42/node_modules/vitepress-mermaid-renderer/dist/vitepress-mermaid-renderer.js
function e() {
	for (const t of me) try {
		t();
	} catch (e) {}
}
var C = [
	"title",
	"aria-label",
	"aria-expanded"
];
var T = ["innerHTML"];
var z = ["title", "aria-label"];
var L = ["innerHTML"];
var F = {
	key: 1,
	class: "zoom-level"
};
var D = ["title", "aria-label"];
var H = ["innerHTML"];
var O = ["title", "aria-label"];
var W = ["innerHTML"];
var A = ["title", "aria-label"];
var I = ["innerHTML"];
var P = {
	key: 0,
	class: "copied-notification"
};
var E = ["title", "aria-label"];
var R = ["innerHTML"];
var B = ["title", "aria-label"];
var V = ["innerHTML"];
var q = { class: "mobile-utility-controls" };
var j = [
	"title",
	"aria-label",
	"aria-expanded"
];
var S = ["innerHTML"];
var Y = ["title", "aria-label"];
var $ = ["innerHTML"];
var U = {
	key: 1,
	class: "zoom-level mobile-zoom-level"
};
var _ = ["title", "aria-label"];
var N = ["innerHTML"];
var X = ["title", "aria-label"];
var Z = ["innerHTML"];
var G = ["title", "aria-label"];
var K = ["innerHTML"];
var Q = {
	key: 0,
	class: "copied-notification"
};
var J = ["title", "aria-label"];
var ee = ["innerHTML"];
var te = ["title", "aria-label"];
var re = ["innerHTML"];
var oe = /*@__PURE__*/ defineComponent({
	t: "MermaidControls",
	props: {
		scale: {},
		code: {},
		isFullscreen: { type: Boolean },
		toolbar: {}
	},
	emits: [
		"zoomIn",
		"zoomOut",
		"resetView",
		"toggleFullscreen",
		"panUp",
		"panDown",
		"panLeft",
		"panRight",
		"download"
	],
	setup(e, { expose: t, emit: o }) {
		const l = "<circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line><line x1=\"11\" y1=\"8\" x2=\"11\" y2=\"14\"></line><line x1=\"8\" y1=\"11\" x2=\"14\" y2=\"11\"></line>", s = "<circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line><line x1=\"8\" y1=\"11\" x2=\"14\" y2=\"11\"></line>", d = "<path d=\"M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.9 3.2L21 8\"></path><path d=\"M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.9-3.2L3 16\"></path>", c = "<rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path>", u = "<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"></path><polyline points=\"7 10 12 15 17 10\"></polyline><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\"></line>", p = "<path d=\"M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3\"></path>", g = "<polyline points=\"9 18 15 12 9 6\"></polyline>";
		let b = 0;
		const v = e, k = () => v.isFullscreen ? v.toolbar.fullscreen : v.toolbar.desktop, oe = () => v.isFullscreen ? v.toolbar.fullscreen : v.toolbar.mobile, ne = (e) => "enabled" === k().buttons[e], ie = (e) => "enabled" === oe().buttons[e], ae = (e) => v.toolbar.i18n.tooltips[e], le = computed(() => v.toolbar.i18n.tooltips.copyCodeCopied ?? "Copied"), se = (e) => e ? v.toolbar.i18n.tooltips.toggleToolbarExpand : v.toolbar.i18n.tooltips.toggleToolbarCollapse, de = ++b, ce = `mermaid-toolbar-desktop-${de}`, me = `mermaid-toolbar-mobile-${de}`, ue = (e) => "collapsed" === e.collapsed && "enabled" === e.buttons.toggleToolbar, pe = ref(ue(v.toolbar.desktop)), ge = ref(ue(v.toolbar.mobile)), he = ref(ue(v.toolbar.fullscreen)), fe = computed({
			get: () => v.isFullscreen ? he.value : pe.value,
			set: (e) => {
				v.isFullscreen ? he.value = e : pe.value = e;
			}
		}), be = computed({
			get: () => v.isFullscreen ? he.value : ge.value,
			set: (e) => {
				v.isFullscreen ? he.value = e : ge.value = e;
			}
		});
		watch(() => ue(v.toolbar.desktop), (e) => {
			pe.value = e;
		});
		watch(() => ue(v.toolbar.mobile), (e) => {
			ge.value = e;
		});
		watch(() => ue(v.toolbar.fullscreen), (e) => {
			he.value = e;
		});
		const we = o, ve = ref(null), ye = ref(null), xe = ref(!1), Me = (e) => [`toolbar-vertical-${e.vertical}`, `toolbar-horizontal-${e.horizontal}`], ke = computed(() => {
			const e = k().positions;
			return Me(e);
		}), Ce = computed(() => {
			const e = oe().positions;
			return Me(e);
		}), Te = (e) => Object.entries(e).some(([e, t]) => "toggleToolbar" !== e && "enabled" === t), ze = computed(() => "enabled" === k().zoomLevel), Le = computed(() => "enabled" === oe().zoomLevel), Fe = computed(() => {
			const e = k();
			return Te(e.buttons) || ze.value;
		}), De = computed(() => {
			const e = oe();
			return Te(e.buttons) || Le.value;
		}), He = async () => {
			try {
				if (!navigator.clipboard) throw new Error("Clipboard API not available in this browser.");
				await navigator.clipboard.writeText(v.code);
				xe.value = !0;
				setTimeout(() => {
					xe.value = !1;
				}, 1e3);
			} catch (e) {
				alert("Failed to copy to clipboard. Your browser might not support this feature.");
			}
		}, Oe = () => {
			we("download", v.toolbar.downloadFormat);
		};
		t({ updateFullscreenControls: () => {
			try {
				if (v.isFullscreen) {
					ve.value && ve.value.classList.add("force-show");
					ye.value && ye.value.classList.add("force-show");
				} else {
					ve.value && ve.value.classList.remove("force-show");
					ye.value && ye.value.classList.remove("force-show");
				}
			} catch (e) {}
		} });
		return (t, r) => (openBlock(), createElementBlock("div", null, [Fe.value ? (openBlock(), createElementBlock("div", {
			key: 0,
			class: normalizeClass(["desktop-controls controls visible-controls", [ke.value, { "is-collapsed": fe.value }]]),
			ref_key: "controls",
			ref: ve
		}, [ne("toggleToolbar") ? (openBlock(), createElementBlock("button", {
			key: 0,
			type: "button",
			class: "toolbar-toggle",
			onClick: r[0] || (r[0] = (e) => fe.value = !fe.value),
			title: se(fe.value),
			"aria-label": se(fe.value),
			"aria-expanded": !fe.value,
			"aria-controls": ce,
			"data-mermaid-control": "toggleToolbar"
		}, [(openBlock(), createElementBlock("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			width: "20",
			height: "20",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			innerHTML: g
		}, null, 8, T))], 8, C)) : createCommentVNode("", !0), withDirectives(createBaseVNode("div", {
			class: "toolbar-items",
			id: ce
		}, [
			ne("zoomIn") ? (openBlock(), createElementBlock("button", {
				key: 0,
				onClick: r[1] || (r[1] = (e) => t.$emit("zoomIn")),
				title: ae("zoomIn"),
				"aria-label": ae("zoomIn"),
				"data-mermaid-control": "zoomIn"
			}, [(openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				width: "20",
				height: "20",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				innerHTML: l
			}, null, 8, L))], 8, z)) : createCommentVNode("", !0),
			ze.value ? (openBlock(), createElementBlock("span", F, toDisplayString(Math.round(100 * e.scale)) + "% ", 1)) : createCommentVNode("", !0),
			ne("zoomOut") ? (openBlock(), createElementBlock("button", {
				key: 2,
				onClick: r[2] || (r[2] = (e) => t.$emit("zoomOut")),
				title: ae("zoomOut"),
				"aria-label": ae("zoomOut"),
				"data-mermaid-control": "zoomOut"
			}, [(openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				width: "20",
				height: "20",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				innerHTML: s
			}, null, 8, H))], 8, D)) : createCommentVNode("", !0),
			ne("resetView") ? (openBlock(), createElementBlock("button", {
				key: 3,
				onClick: r[3] || (r[3] = (e) => t.$emit("resetView")),
				title: ae("resetView"),
				"aria-label": ae("resetView"),
				"data-mermaid-control": "resetView"
			}, [(openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				width: "20",
				height: "20",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				innerHTML: d
			}, null, 8, W))], 8, O)) : createCommentVNode("", !0),
			ne("copyCode") ? (openBlock(), createElementBlock("button", {
				key: 4,
				onClick: He,
				title: ae("copyCode"),
				"aria-label": ae("copyCode"),
				"data-mermaid-control": "copyCode"
			}, [(openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				width: "20",
				height: "20",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				innerHTML: c
			}, null, 8, I)), xe.value ? (openBlock(), createElementBlock("span", P, toDisplayString(le.value), 1)) : createCommentVNode("", !0)], 8, A)) : createCommentVNode("", !0),
			ne("download") ? (openBlock(), createElementBlock("button", {
				key: 5,
				onClick: Oe,
				title: ae("download"),
				"aria-label": ae("download"),
				"data-mermaid-control": "download"
			}, [(openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				width: "20",
				height: "20",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				innerHTML: u
			}, null, 8, R))], 8, E)) : createCommentVNode("", !0),
			ne("toggleFullscreen") ? (openBlock(), createElementBlock("button", {
				key: 6,
				onClick: r[4] || (r[4] = (e) => t.$emit("toggleFullscreen")),
				title: ae("toggleFullscreen"),
				"aria-label": ae("toggleFullscreen"),
				"data-mermaid-control": "toggleFullscreen"
			}, [(openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				width: "20",
				height: "20",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				innerHTML: p
			}, null, 8, V))], 8, B)) : createCommentVNode("", !0)
		], 512), [[vShow, !fe.value]])], 2)) : createCommentVNode("", !0), De.value ? (openBlock(), createElementBlock("div", {
			key: 1,
			class: normalizeClass(["mobile-controls controls visible-controls", [Ce.value, { "is-collapsed": be.value }]]),
			ref_key: "mobileControls",
			ref: ye
		}, [createBaseVNode("div", q, [ie("toggleToolbar") ? (openBlock(), createElementBlock("button", {
			key: 0,
			type: "button",
			class: "toolbar-toggle",
			onClick: r[5] || (r[5] = (e) => be.value = !be.value),
			title: se(be.value),
			"aria-label": se(be.value),
			"aria-expanded": !be.value,
			"aria-controls": me,
			"data-mermaid-control": "toggleToolbar"
		}, [(openBlock(), createElementBlock("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			width: "20",
			height: "20",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			innerHTML: g
		}, null, 8, S))], 8, j)) : createCommentVNode("", !0), withDirectives(createBaseVNode("div", {
			class: "toolbar-items",
			id: me
		}, [
			ie("zoomIn") ? (openBlock(), createElementBlock("button", {
				key: 0,
				onClick: r[6] || (r[6] = (e) => t.$emit("zoomIn")),
				title: ae("zoomIn"),
				"aria-label": ae("zoomIn"),
				"data-mermaid-control": "zoomIn"
			}, [(openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				width: "20",
				height: "20",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				innerHTML: l
			}, null, 8, $))], 8, Y)) : createCommentVNode("", !0),
			Le.value ? (openBlock(), createElementBlock("span", U, toDisplayString(Math.round(100 * e.scale)) + "% ", 1)) : createCommentVNode("", !0),
			ie("zoomOut") ? (openBlock(), createElementBlock("button", {
				key: 2,
				onClick: r[7] || (r[7] = (e) => t.$emit("zoomOut")),
				title: ae("zoomOut"),
				"aria-label": ae("zoomOut"),
				"data-mermaid-control": "zoomOut"
			}, [(openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				width: "20",
				height: "20",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				innerHTML: s
			}, null, 8, N))], 8, _)) : createCommentVNode("", !0),
			ie("resetView") ? (openBlock(), createElementBlock("button", {
				key: 3,
				onClick: r[8] || (r[8] = (e) => t.$emit("resetView")),
				title: ae("resetView"),
				"aria-label": ae("resetView"),
				"data-mermaid-control": "resetView"
			}, [(openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				width: "20",
				height: "20",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				innerHTML: d
			}, null, 8, Z))], 8, X)) : createCommentVNode("", !0),
			ie("copyCode") ? (openBlock(), createElementBlock("button", {
				key: 4,
				onClick: He,
				title: ae("copyCode"),
				"aria-label": ae("copyCode"),
				"data-mermaid-control": "copyCode"
			}, [(openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				width: "20",
				height: "20",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				innerHTML: c
			}, null, 8, K)), xe.value ? (openBlock(), createElementBlock("span", Q, toDisplayString(le.value), 1)) : createCommentVNode("", !0)], 8, G)) : createCommentVNode("", !0),
			ie("download") ? (openBlock(), createElementBlock("button", {
				key: 5,
				onClick: Oe,
				title: ae("download"),
				"aria-label": ae("download"),
				"data-mermaid-control": "download"
			}, [(openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				width: "20",
				height: "20",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				innerHTML: u
			}, null, 8, ee))], 8, J)) : createCommentVNode("", !0),
			ie("toggleFullscreen") ? (openBlock(), createElementBlock("button", {
				key: 6,
				onClick: r[9] || (r[9] = (e) => t.$emit("toggleFullscreen")),
				title: ae("toggleFullscreen"),
				"aria-label": ae("toggleFullscreen"),
				"data-mermaid-control": "toggleFullscreen"
			}, [(openBlock(), createElementBlock("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				width: "20",
				height: "20",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				innerHTML: p
			}, null, 8, re))], 8, te)) : createCommentVNode("", !0)
		], 512), [[vShow, !be.value]])])], 2)) : createCommentVNode("", !0)]));
	}
});
var ne = {
	key: 0,
	class: "diagram-error",
	role: "alert"
};
var ie = { class: "error-message" };
var ae = {
	key: 0,
	class: "error-details"
};
var le = /*#__PURE__*/ ((e) => {
	const t = e.o || e;
	for (const [r, o] of [["__scopeId", "data-v-87a9d038"]]) t[r] = o;
	return t;
})(/*@__PURE__*/ defineComponent({
	t: "MermaidError",
	props: {
		renderError: { type: Boolean },
		renderErrorDetails: {},
		errorText: {},
		showDetailsText: {},
		hideDetailsText: {}
	},
	setup(e) {
		const t = e, r = ref(!1), o = () => {
			r.value = !r.value;
		};
		return (l, s) => e.renderError ? (openBlock(), createElementBlock("div", ne, [createBaseVNode("div", ie, [
			s[0] || (s[0] = createBaseVNode("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				width: "24",
				height: "24",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor"
			}, [
				createBaseVNode("circle", {
					cx: "12",
					cy: "12",
					r: "10"
				}),
				createBaseVNode("line", {
					x1: "12",
					y1: "8",
					x2: "12",
					y2: "12"
				}),
				createBaseVNode("line", {
					x1: "12",
					y1: "16",
					x2: "12.01",
					y2: "16"
				})
			], -1)),
			createBaseVNode("span", null, toDisplayString(t.errorText || "Failed to render diagram"), 1),
			createBaseVNode("button", {
				onClick: o,
				class: "error-toggle-button"
			}, toDisplayString(r.value ? t.hideDetailsText || "Hide Details" : t.showDetailsText || "Show Details"), 1)
		]), r.value ? (openBlock(), createElementBlock("pre", ae, toDisplayString(e.renderErrorDetails), 1)) : createCommentVNode("", !0)])) : createCommentVNode("", !0);
	}
}));
var se = Promise.resolve();
var de = null;
var ce = () => new Promise((e) => requestAnimationFrame(() => e()));
var me = /* @__PURE__ */ new Set();
var ue = !1;
var pe = {
	buttons: {
		zoomIn: "enabled",
		zoomOut: "enabled",
		resetView: "enabled",
		copyCode: "enabled",
		toggleFullscreen: "enabled",
		download: "disabled",
		toggleToolbar: "disabled"
	},
	positions: {
		vertical: "bottom",
		horizontal: "right"
	},
	zoomLevel: "enabled",
	collapsed: "expanded"
};
var ge = {
	buttons: {
		zoomIn: "disabled",
		zoomOut: "disabled",
		resetView: "enabled",
		copyCode: "enabled",
		toggleFullscreen: "enabled",
		download: "disabled",
		toggleToolbar: "disabled"
	},
	positions: {
		vertical: "bottom",
		horizontal: "right"
	},
	zoomLevel: "enabled",
	collapsed: "expanded"
};
var he = {
	buttons: {
		zoomIn: "disabled",
		zoomOut: "disabled",
		resetView: "disabled",
		copyCode: "disabled",
		toggleFullscreen: "enabled",
		download: "disabled",
		toggleToolbar: "disabled"
	},
	positions: {
		vertical: "bottom",
		horizontal: "right"
	},
	zoomLevel: "enabled",
	collapsed: "expanded"
};
var fe = {
	zoomIn: "Zoom In",
	zoomOut: "Zoom Out",
	resetView: "Reset View",
	copyCode: "Copy Code",
	copyCodeCopied: "Copied",
	download: "Download Diagram",
	toggleFullscreen: "Toggle Fullscreen",
	renderErrorText: "Failed to render diagram",
	toggleErrorDetailsText: "Show Details",
	toggleErrorDetailsHideText: "Hide Details",
	toggleToolbarExpand: "Expand Toolbar",
	toggleToolbarCollapse: "Collapse Toolbar"
};
var be = (e, t) => ({
	vertical: t?.vertical ?? e.vertical,
	horizontal: t?.horizontal ?? e.horizontal
});
var we = (e) => "enabled" === e || "disabled" === e;
var ve = [
	"positions",
	"zoomLevel",
	"collapsed"
];
var ye = (e, t) => {
	if (!t) return { ...e };
	const r = { ...e };
	Object.keys(t).forEach((e) => {
		if (ve.includes(e)) return;
		const o = e, n = t[o];
		we(n) && (r[o] = n);
	});
	return r;
};
var xe = (e, t) => {
	const r = t?.collapsed;
	return {
		buttons: ye(e.buttons, t),
		positions: be(e.positions, t?.positions),
		zoomLevel: t?.zoomLevel && we(t.zoomLevel) ? t.zoomLevel : e.zoomLevel,
		collapsed: (o = r, "expanded" === o || "collapsed" === o ? r : e.collapsed)
	};
	var o;
};
var Me = (e) => "string" == typeof e && e.length > 0;
var ke = (e) => {
	const t = Me(e?.localeIndex) ? e.localeIndex : "root", r = e?.locales?.[t]?.tooltips, o = e?.tooltips, n = fe;
	return {
		localeIndex: t,
		tooltips: [
			"zoomIn",
			"zoomOut",
			"resetView",
			"copyCode",
			"copyCodeCopied",
			"toggleFullscreen",
			"download",
			"renderErrorText",
			"toggleErrorDetailsText",
			"toggleErrorDetailsHideText",
			"toggleToolbarExpand",
			"toggleToolbarCollapse"
		].reduce((e, t) => {
			e[t] = ((e, ...t) => {
				for (const r of t) {
					const t = r?.[e];
					if (Me(t)) return t;
				}
			})(t, r, o) ?? n[t];
			return e;
		}, {})
	};
};
var Ce = (e) => {
	const t = e?.showLanguageLabel ?? !0, r = e?.downloadFormat ?? "svg", o = e?.fullscreenMode ?? "browser";
	return {
		desktop: xe(pe, e?.desktop),
		mobile: xe(ge, e?.mobile),
		fullscreen: xe(he, e?.fullscreen),
		showLanguageLabel: t,
		downloadFormat: r,
		fullscreenMode: o,
		i18n: ke(e?.i18n)
	};
};
var Te = [
	"tabindex",
	"role",
	"aria-label"
];
var ze = {
	key: 0,
	role: "status",
	"aria-live": "polite",
	class: "sr-only"
};
var Le = ["aria-label"];
var Fe = /*@__PURE__*/ defineComponent({
	t: "MermaidDiagram",
	props: {
		code: {},
		config: {},
		toolbar: {},
		static: { type: Boolean }
	},
	emits: ["renderComplete"],
	setup(l, { emit: d }) {
		function b(e, t, r, o, n = !1) {
			if (!R.value && !n || !fe.value || e === t) return;
			const i = F.value * e, a = F.value * t;
			if (i <= 0 || a <= 0) return;
			const l = fe.value.getBoundingClientRect();
			if (l.width <= 0 || l.height <= 0) return;
			const s = l.top + l.height / 2 - i * (H.value + P.value);
			I.value += (r - (l.left + l.width / 2 - i * (D.value + I.value))) * (1 / a - 1 / i);
			P.value += (o - s) * (1 / a - 1 / i);
		}
		function y() {
			const e = document.getElementById(Oe)?.querySelector("svg");
			if (!e) return null;
			const t = e.getBoundingClientRect();
			return t.width <= 0 || t.height <= 0 ? null : {
				clientX: t.left + t.width / 2,
				clientY: t.top + t.height / 2
			};
		}
		const M = d, C = l, T = ref(C.static ?? !1), z = (e) => {
			return e && (t = e, Boolean(t && t.desktop && "object" == typeof t.desktop && "buttons" in t.desktop && "positions" in t.desktop && "zoomLevel" in t.desktop && "collapsed" in t.desktop && "boolean" == typeof t.showLanguageLabel && "string" == typeof t.downloadFormat && "string" == typeof t.fullscreenMode && !!t.i18n && "object" == typeof t.i18n && "string" == typeof t.i18n.localeIndex && !!t.i18n.tooltips && "object" == typeof t.i18n.tooltips)) ? e : Ce(e);
			var t;
		}, L = ref(z(C.toolbar)), F = ref(1), D = ref(0), H = ref(0), O = function(e = {}) {
			const t = e.minScale ?? .2, r = e.maxScale ?? 10, o = e.zoomStep ?? 1.2, n = ref(1), i = ref(0), a = ref(0), l = ref(!1), s = ref(!1), d = ref(0), c = ref(0), m = ref(0), u = ref(!1), p = ref(0), g = ref(0), h = ref(null), b = () => "undefined" != typeof window && window.matchMedia("(max-width: 768px)").matches && !s.value, w = () => Math.max(Number.EPSILON, (e.getBaseScale?.() ?? 1) * n.value), v = (o, i, a) => {
				if (o < t || o > r) return;
				const l = n.value;
				n.value = o;
				e.onGestureZoom?.({
					previousScale: l,
					scale: o,
					clientX: i,
					clientY: a
				});
			};
			watch(s, (e) => {
				e ? h.value = {
					scale: n.value,
					translateX: i.value,
					translateY: a.value
				} : (() => {
					if (h.value) {
						n.value = h.value.scale;
						i.value = h.value.translateX;
						a.value = h.value.translateY;
						l.value = !1;
						u.value = !1;
						m.value = 0;
						h.value = null;
					}
				})();
			}, { flush: "sync" });
			return {
				scale: n,
				translateX: i,
				translateY: a,
				isPanning: l,
				isFullscreen: s,
				zoomIn: () => {
					n.value = n.value * o;
				},
				zoomOut: () => {
					n.value > t && (n.value = n.value / o);
				},
				resetView: () => {
					n.value = 1;
					i.value = 0;
					a.value = 0;
				},
				fitDiagramToContainer: (e, t) => {
					if (!e || !t) return;
					const r = e.getBoundingClientRect(), o = t.getBoundingClientRect();
					if (r.width <= 0 || r.height <= 0 || o.width <= 0 || o.height <= 0) return;
					const l = Math.min(r.width / o.width, r.height / o.height);
					if (!Number.isFinite(l) || l <= 0) return;
					n.value = l;
					const s = t.parentElement?.getBoundingClientRect();
					if (s && s.width > 0 && s.height > 0) {
						i.value = (r.left + r.width / 2 - (s.left + s.width / 2)) / l;
						a.value = (r.top + r.height / 2 - (s.top + s.height / 2)) / l;
					} else {
						i.value = (r.width - o.width) / 2;
						a.value = (r.height - o.height) / 2;
					}
				},
				toggleFullscreen: (e, t = "browser") => {
					try {
						if ("dialog" === t) {
							s.value = !s.value;
							return;
						}
						if (document.fullscreenElement) {
							document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen();
							s.value = !1;
						} else {
							if (e?.requestFullscreen) e.requestFullscreen();
							else if (e?.webkitRequestFullscreen) e.webkitRequestFullscreen();
							else if (e?.mozRequestFullScreen) e.mozRequestFullScreen();
							else {
								if (!e?.msRequestFullscreen) throw new Error("Fullscreen API not available");
								e.msRequestFullscreen();
							}
							s.value = !0;
						}
					} catch (r) {
						alert("Fullscreen mode is not supported in this browser.");
					}
				},
				startPan: (e) => {
					l.value = !0;
					d.value = e.clientX;
					c.value = e.clientY;
				},
				pan: (e) => {
					if (!l.value) return;
					const t = e.clientX - d.value, r = e.clientY - c.value, o = w();
					i.value += t / o;
					a.value += r / o;
					d.value = e.clientX;
					c.value = e.clientY;
				},
				endPan: () => {
					l.value = !1;
				},
				handleWheel: (e) => {
					if (!e.ctrlKey && !s.value) return;
					e.preventDefault();
					const t = .1 * -Math.sign(e.deltaY);
					v(n.value * (1 + t), e.clientX, e.clientY);
				},
				handleTouchStart: (e) => {
					if (b()) {
						if (2 === e.touches.length) {
							e.preventDefault();
							u.value = !1;
							const t = e.touches[0], r = e.touches[1];
							m.value = Math.hypot(r.clientX - t.clientX, r.clientY - t.clientY);
							p.value = (t.clientX + r.clientX) / 2;
							g.value = (t.clientY + r.clientY) / 2;
						}
					} else if (1 === e.touches.length) {
						u.value = !0;
						p.value = e.touches[0].clientX;
						g.value = e.touches[0].clientY;
					} else if (2 === e.touches.length) {
						u.value = !1;
						const t = e.touches[0], r = e.touches[1];
						m.value = Math.hypot(r.clientX - t.clientX, r.clientY - t.clientY);
					}
				},
				handleTouchMove: (e) => {
					if (b()) {
						if (1 === e.touches.length) return;
						if (2 === e.touches.length) {
							e.preventDefault();
							const t = e.touches[0], r = e.touches[1], o = (t.clientX + r.clientX) / 2, l = (t.clientY + r.clientY) / 2, s = Math.hypot(r.clientX - t.clientX, r.clientY - t.clientY);
							if (m.value > 0) {
								v(n.value * (1 + .2 * (s / m.value - 1)), o, l);
								m.value = s;
							}
							const d = w();
							i.value += (o - p.value) / d;
							a.value += (l - g.value) / d;
							p.value = o;
							g.value = l;
						}
					} else {
						e.preventDefault();
						if (u.value && 1 === e.touches.length) {
							const t = e.touches[0], r = t.clientX - p.value, o = t.clientY - g.value, n = w();
							i.value += r / n;
							a.value += o / n;
							p.value = t.clientX;
							g.value = t.clientY;
						} else if (2 === e.touches.length) {
							const t = e.touches[0], r = e.touches[1], o = Math.hypot(r.clientX - t.clientX, r.clientY - t.clientY);
							if (m.value > 0) {
								v(n.value * (1 + .2 * (o / m.value - 1)), (t.clientX + r.clientX) / 2, (t.clientY + r.clientY) / 2);
								m.value = o;
							}
						}
					}
				},
				handleTouchEnd: () => {
					u.value = !1;
					m.value = 0;
				},
				panUp: () => {
					a.value -= 50 / w();
				},
				panDown: () => {
					a.value += 50 / w();
				},
				panLeft: () => {
					i.value -= 50 / w();
				},
				panRight: () => {
					i.value += 50 / w();
				},
				updateFullscreenControls: (e) => {
					try {
						if (document.fullscreenElement) {
							s.value = !0;
							e.controls && e.controls.classList.add("force-show");
							e.mobileControls && e.mobileControls.classList.add("force-show");
						} else {
							s.value = !1;
							e.controls && e.controls.classList.remove("force-show");
							e.mobileControls && e.mobileControls.classList.remove("force-show");
						}
					} catch (t) {}
				}
			};
		}({
			onGestureZoom: function(e) {
				b(e.previousScale, e.scale, e.clientX, e.clientY);
			},
			getBaseScale: () => F.value
		}), W = function(e = {}) {
			const t = ref(!1), r = ref(!1), o = ref(!1), n = ref(""), i = ref({
				width: 0,
				height: 0
			}), a = ref(null);
			let l = null;
			const s = {
				theme: "default",
				securityLevel: "strict",
				startOnLoad: !1,
				flowchart: {
					useMaxWidth: !1,
					htmlLabels: !0
				},
				swimlane: { useMaxWidth: !1 },
				sequence: {
					diagramMarginX: 50,
					diagramMarginY: 10,
					actorMargin: 50,
					width: 150,
					height: 65,
					boxMargin: 10,
					boxTextMargin: 5,
					noteMargin: 10,
					messageMargin: 35,
					mirrorActors: !0,
					bottomMarginAdj: 1,
					useMaxWidth: !1,
					rightAngles: !1,
					showSequenceNumbers: !1
				},
				gantt: {
					useMaxWidth: !1,
					topPadding: 50,
					leftPadding: 50,
					rightPadding: 50,
					gridLineStartPadding: 35,
					barHeight: 50,
					barGap: 40,
					displayMode: "compact",
					axisFormat: "%Y-%m-%d",
					topAxis: !1,
					tickInterval: "day",
					useWidth: 2048
				},
				class: {
					arrowMarkerAbsolute: !1,
					useMaxWidth: !1
				},
				journey: { useMaxWidth: !1 },
				timeline: { useMaxWidth: !1 },
				state: { useMaxWidth: !1 },
				er: { useMaxWidth: !1 },
				pie: { useMaxWidth: !1 },
				quadrantChart: { useMaxWidth: !1 },
				xyChart: { useMaxWidth: !1 },
				requirement: { useMaxWidth: !1 },
				architecture: { useMaxWidth: !1 },
				mindmap: { useMaxWidth: !1 },
				ishikawa: { useMaxWidth: !1 },
				kanban: { useMaxWidth: !1 },
				c4: {
					useMaxWidth: !1,
					diagramMarginX: 20,
					diagramMarginY: 20
				},
				gitGraph: {
					useMaxWidth: !1,
					rotateCommitLabel: !1,
					showBranches: !0,
					showCommitLabel: !0,
					mainBranchName: "main"
				},
				sankey: { useMaxWidth: !1 },
				packet: { useMaxWidth: !1 },
				block: { useMaxWidth: !1 },
				eventmodeling: { useMaxWidth: !1 },
				treeView: { useMaxWidth: !1 },
				radar: { useMaxWidth: !1 },
				venn: { useMaxWidth: !1 },
				"wardley-beta": { useMaxWidth: !1 },
				cynefin: { useMaxWidth: !1 },
				railroad: { useMaxWidth: !1 }
			}, d = (t) => {
				mermaid_default.initialize({
					...s,
					...e.config,
					...t
				});
			}, m = (e) => {
				d(e.detail);
				const t = a.value;
				if (t) {
					r.value = !1;
					nextTick(() => {
						h(t.id, t.code);
					});
				}
			}, u = (e) => {
				const t = e.trim().toLowerCase();
				return t.startsWith("c4context") || t.startsWith("c4container") || t.startsWith("c4component") || t.startsWith("c4dynamic") || t.startsWith("c4deployment") ? "c4" : t.startsWith("gitgraph") || t.includes("gitgraph:") ? "gitgraph" : t.startsWith("flowchart") || t.startsWith("graph") ? "flowchart" : t.startsWith("sequencediagram") || t.startsWith("sequenceDiagram") ? "sequence" : t.startsWith("gantt") ? "gantt" : "unknown";
			}, h = async (t, s, d = 0, c = 3) => {
				try {
					let m = document.getElementById(t);
					if (!m) {
						if (d < c) {
							const e = 100 * Math.pow(2, d);
							await new Promise((t) => setTimeout(t, e));
							return h(t, s, d + 1, c);
						}
						throw new Error("Failed to find diagram container element");
					}
					a.value = {
						id: t,
						code: s
					};
					const p = e.onBeforeRender?.({
						id: t,
						code: s
					});
					p && await p;
					m.textContent = s;
					m.removeAttribute("data-processed");
					o.value = !1;
					n.value = "";
					r.value = !1;
					m.classList.add("mermaid-rendering");
					await (() => {
						const a = se.catch(() => {}).then(() => (async () => {
							try {
								await ((e) => {
									if (void 0 !== e && !((e) => /^\s*zenuml/i.test(e))(e)) return Promise.resolve();
									de ??= (async () => {
										try {
											const { default: e } = await import("./mermaid-zenuml_vitepress-mermaid-renderer-cnu5Mb49.js").then((m) => /* @__PURE__ */ __toESM(m.default, 1));
											e && await mermaid_default.registerExternalDiagrams([e]);
										} catch {}
									})();
									return de;
								})(s);
								await mermaid_default.run({
									nodes: [m],
									suppressErrors: !1
								});
								await ce();
								if (m.firstElementChild) {
									const e = m.querySelector("svg");
									if (e) {
										await ce();
										if (m.parentElement?.querySelector(".diagram-wrapper")) {
											const t = u(s);
											m.classList.add(`mermaid-${t}`);
											if ("c4" === t || "gitgraph" === t) {
												e.style.width = "100%";
												e.style.height = "auto";
												e.style.maxWidth = "100%";
												e.style.display = "block";
												e.removeAttribute("width");
												e.removeAttribute("height");
												if (!e.getAttribute("viewBox")) try {
													const t = e.getBBox();
													if (t.width && t.height) {
														e.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`);
														e.setAttribute("preserveAspectRatio", "xMidYMid meet");
													}
												} catch (a) {}
												e.style.display = "none";
												e.style.display = "block";
											}
										}
										i.value = {
											width: e.getBoundingClientRect().width,
											height: e.getBoundingClientRect().height
										};
									}
								}
								r.value = !0;
								o.value = !1;
								e.onRenderComplete?.({
									id: t,
									success: !0
								});
							} catch (a) {
								o.value = !0;
								n.value = a instanceof Error ? a.toString() : "Unknown error rendering diagram";
								r.value = !0;
								e.onRenderComplete?.({
									id: t,
									success: !1,
									error: a
								});
								"undefined" != typeof window && 0 === d && (l = setTimeout(() => {
									l = null;
									h(t, s, d + 1, c);
								}, 1e3));
							} finally {
								m.classList.remove("mermaid-rendering");
							}
						})());
						se = a.catch(() => {});
						return a;
					})();
				} catch (m) {
					o.value = !0;
					n.value = m instanceof Error ? m.toString() : "Unknown error initializing component";
					e.onRenderComplete?.({
						id: t,
						success: !1,
						error: m
					});
				}
			};
			onMounted(() => {
				t.value = !0;
				d();
				document.addEventListener("vitepress-mermaid:config-updated", m);
			});
			onUnmounted(() => {
				if (l) {
					clearTimeout(l);
					l = null;
				}
				document.removeEventListener("vitepress-mermaid:config-updated", m);
			});
			return {
				mounted: t,
				isRendered: r,
				renderError: o,
				renderErrorDetails: n,
				originalDiagramSize: i,
				renderMermaidDiagram: h,
				detectDiagramType: u
			};
		}({
			config: C.config,
			onBeforeRender: () => {
				if (De) {
					Se();
					q();
					F.value = 1;
					D.value = 0;
					H.value = 0;
					return nextTick();
				}
			},
			onRenderComplete: (e) => M("renderComplete", e)
		}), { scale: A, translateX: I, translateY: P, isPanning: E, isFullscreen: R, zoomIn: B, zoomOut: V, resetView: q, fitDiagramToContainer: j, toggleFullscreen: S, startPan: Y, pan: $, endPan: U, handleWheel: _, handleTouchStart: N, handleTouchMove: X, handleTouchEnd: Z, panUp: G, panDown: K, panLeft: Q, panRight: J, updateFullscreenControls: ee } = O, { mounted: te, isRendered: re, renderError: ne, renderErrorDetails: ie, renderMermaidDiagram: ae } = W, pe = ref(null), ge = ref(null), he = ref(null), fe = ref(null), be = ref("center center"), we = ref(!1);
		let ve = null, ye = null, xe = null, Me = !1, ke = 0, Fe = 0, De = null, He = null;
		const Oe = `mermaid-${getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)}`, { handleDownload: We } = (Xe = { diagramId: Oe }, { handleDownload: async (e) => {
			const t = document.getElementById(Xe.diagramId)?.querySelector("svg");
			if (!t) return;
			const r = t.cloneNode(!0);
			"svg" !== e && (r.style.backgroundColor = "white");
			((e) => {
				e.querySelectorAll("script, iframe, object, embed, link[rel=\"stylesheet\"]").forEach((e) => e.remove());
				e.querySelectorAll("*").forEach((e) => {
					Array.from(e.attributes).forEach((t) => {
						t.name.startsWith("on") && t.name.length > 2 && e.removeAttribute(t.name);
					});
				});
			})(r);
			const o = new XMLSerializer().serializeToString(r), n = new Blob([o], { type: "image/svg+xml;charset=utf-8" }), i = URL.createObjectURL(n), a = document.createElement("a");
			a.download = `diagram.${e}`;
			if ("svg" === e) {
				a.href = i;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(i);
				return;
			}
			const l = new Image();
			l.onload = () => {
				const r = document.createElement("canvas"), o = t.viewBox.baseVal;
				let n = o?.width, s = o?.height;
				if (!n || !s) {
					const e = t.getBoundingClientRect();
					n = e.width;
					s = e.height;
				}
				r.width = n;
				r.height = s;
				const d = r.getContext("2d");
				if (d) {
					d.fillStyle = "white";
					d.fillRect(0, 0, n, s);
					d.drawImage(l, 0, 0);
					const t = r.toDataURL("png" === e ? "image/png" : "image/jpeg");
					a.href = t;
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
				}
				URL.revokeObjectURL(i);
			};
			l.onerror = (e) => {
				URL.revokeObjectURL(i);
			};
			l.src = i;
		} }), Ae = computed(() => L.value.fullscreenMode), Ie = computed(() => R.value && "dialog" === Ae.value), Pe = (e) => {
			L.value = z(e.detail);
		}, Ee = (e) => {
			T.value = e.detail;
		}, Re = async (e) => {
			if (!T.value) {
				q();
				F.value = 1;
				D.value = 0;
				H.value = 0;
				await nextTick();
				await new Promise((e) => requestAnimationFrame(() => e()));
				if (!T.value) {
					j(he.value, document.getElementById(Oe));
					F.value = A.value;
					D.value = I.value;
					H.value = P.value;
					if (e) {
						A.value = e.scale;
						I.value = e.translateX;
						P.value = e.translateY;
					} else q();
				}
			}
		}, Be = () => {
			T.value || null !== xe || (xe = requestAnimationFrame(() => {
				xe = null;
				if (T.value || Me || we.value || E.value) return;
				const e = he.value?.getBoundingClientRect();
				if (!(!e || e.width <= 0 || e.height <= 0 || e.width === ke && e.height === Fe)) {
					ke = e.width;
					Fe = e.height;
					Ue();
					(() => {
						if (T.value || !re.value || E.value) return;
						const e = he.value, t = document.getElementById(Oe);
						if (!e || !t) return;
						const r = F.value * A.value;
						if (!Number.isFinite(r) || r <= 0) return;
						const o = e.getBoundingClientRect(), n = t.getBoundingClientRect();
						if (o.width <= 0 || o.height <= 0 || n.width <= 0 || n.height <= 0) return;
						const i = n.width / r, a = n.height / r, l = Math.min(o.width / i, o.height / a);
						if (!Number.isFinite(l) || l <= 0) return;
						const s = fe.value?.getBoundingClientRect();
						if (s && s.width > 0 && s.height > 0) {
							const e = s.top + s.height / 2 - r * (H.value + P.value);
							D.value = (o.left + o.width / 2 - (s.left + s.width / 2 - r * (D.value + I.value))) / l;
							H.value = (o.top + o.height / 2 - e) / l;
						} else {
							D.value = (o.width - i) / 2;
							H.value = (o.height - a) / 2;
						}
						F.value = l;
					})();
				}
			}));
		}, Ve = () => {
			De = {
				scale: A.value,
				translateX: I.value,
				translateY: P.value
			};
		}, qe = () => {
			je();
			q();
		}, je = () => {
			we.value = !0;
			ve && clearTimeout(ve);
			ve = setTimeout(() => {
				we.value = !1;
				ve = null;
				Be();
			}, 300);
		}, Se = () => {
			we.value = !1;
			if (ve) {
				clearTimeout(ve);
				ve = null;
			}
		}, Ye = () => {
			const e = y(), t = A.value;
			je();
			B();
			e && b(t, A.value, e.clientX, e.clientY, !0);
		}, $e = () => {
			const e = y(), t = A.value;
			je();
			V();
			e && b(t, A.value, e.clientX, e.clientY, !0);
		}, Ue = () => {
			if (T.value || !fe.value) return;
			const e = fe.value.getBoundingClientRect(), t = Math.max(Number.EPSILON, F.value * A.value);
			e.width > 0 && e.height > 0 && t > 0 && (be.value = `${e.width / t / 2}px ${e.height / t / 2}px`);
		}, _e = () => {
			S(ge.value, Ae.value);
		}, Ne = () => {
			U();
			Be();
		};
		var Xe;
		let Ze = !1, Ge = null;
		const Ke = () => {
			ee({
				controls: pe.value?.$refs.controls,
				mobileControls: pe.value?.$refs.mobileControls
			});
		};
		let Qe = !1;
		const Je = () => {
			if (!Qe) {
				(function(t) {
					(function() {
						if (!ue && "undefined" != typeof document) {
							document.addEventListener("fullscreenchange", e);
							document.addEventListener("webkitfullscreenchange", e);
							document.addEventListener("mozfullscreenchange", e);
							document.addEventListener("MSFullscreenChange", e);
							ue = !0;
						}
					})();
					me.add(t);
				})(Ke);
				Qe = !0;
			}
		}, et = () => {
			if (Qe) {
				(function(t) {
					me.delete(t);
					if (0 === me.size && ue && "undefined" != typeof document) {
						document.removeEventListener("fullscreenchange", e);
						document.removeEventListener("webkitfullscreenchange", e);
						document.removeEventListener("mozfullscreenchange", e);
						document.removeEventListener("MSFullscreenChange", e);
						ue = !1;
					}
				})(Ke);
				Qe = !1;
			}
		};
		onMounted(async () => {
			try {
				await nextTick();
				await ae(Oe, C.code);
				Ue();
				await Re();
				const e = he.value?.getBoundingClientRect();
				if (e && e.width > 0 && e.height > 0) {
					ke = e.width;
					Fe = e.height;
				}
				if ("undefined" != typeof ResizeObserver && he.value) {
					ye = new ResizeObserver(() => {
						Be();
					});
					ye.observe(he.value);
				}
				T.value || Je();
				document.addEventListener("vitepress-mermaid:toolbar-updated", Pe);
				document.addEventListener("vitepress-mermaid:static-mode-updated", Ee);
				document.addEventListener("vitepress-mermaid:config-updated", Ve);
			} catch (e) {}
		});
		watch(Ie, (e) => {
			"undefined" != typeof document && document.body.classList.toggle("mermaid-dialog-open", e);
		});
		watch(R, (e) => {
			(async (e) => {
				if (!T.value) {
					Me = !0;
					try {
						if (e) {
							He = {
								fitScale: F.value,
								fitTranslateX: D.value,
								fitTranslateY: H.value
							};
							await nextTick();
							await new Promise((e) => requestAnimationFrame(() => requestAnimationFrame(() => e())));
							await Re();
							return;
						}
						if (!He) return;
						F.value = He.fitScale;
						D.value = He.fitTranslateX;
						H.value = He.fitTranslateY;
						He = null;
					} finally {
						Me = !1;
						ke = 0;
						Fe = 0;
						T.value || requestAnimationFrame(Be);
					}
				}
			})(e);
		});
		watch(T, (e) => {
			e ? et() : Je();
		});
		watch(re, (e) => {
			if (e && De) {
				const e = De;
				De = null;
				if (!T.value) {
					Re(e);
					return;
				}
				A.value = e.scale;
				I.value = e.translateX;
				P.value = e.translateY;
			}
		});
		watch(T, (e, t) => {
			if (!e && e !== t) {
				Ue();
				Re();
			}
		});
		onUnmounted(() => {
			"undefined" != typeof document && document.body.classList.remove("mermaid-dialog-open");
			et();
			ve && clearTimeout(ve);
			null !== xe && cancelAnimationFrame(xe);
			He = null;
			ye?.disconnect();
			document.removeEventListener("vitepress-mermaid:toolbar-updated", Pe);
			document.removeEventListener("vitepress-mermaid:static-mode-updated", Ee);
			document.removeEventListener("vitepress-mermaid:config-updated", Ve);
		});
		return (e, r) => (openBlock(), createElementBlock(Fragment, null, [unref(te) && !T.value && Ie.value ? (openBlock(), createElementBlock("div", {
			key: 0,
			class: "mermaid-dialog-backdrop",
			onClick: _e,
			"aria-hidden": "true"
		})) : createCommentVNode("", !0), unref(te) ? (openBlock(), createElementBlock("div", {
			key: 1,
			ref_key: "fullscreenWrapper",
			ref: ge,
			class: normalizeClass(["mermaid-container", {
				"dialog-fullscreen-active": Ie.value,
				"static-mermaid-container": T.value
			}]),
			"data-fullscreen-wrapper": ""
		}, [
			T.value ? createCommentVNode("", !0) : (openBlock(), createBlock(oe, {
				key: 0,
				ref_key: "controlsRef",
				ref: pe,
				scale: unref(A),
				code: l.code,
				"is-fullscreen": unref(R),
				toolbar: L.value,
				onZoomIn: Ye,
				onZoomOut: $e,
				onResetView: qe,
				onToggleFullscreen: _e,
				onPanUp: unref(G),
				onPanDown: unref(K),
				onPanLeft: unref(Q),
				onPanRight: unref(J),
				onDownload: unref(We)
			}, null, 8, [
				"scale",
				"code",
				"is-fullscreen",
				"toolbar",
				"onPanUp",
				"onPanDown",
				"onPanLeft",
				"onPanRight",
				"onDownload"
			])),
			T.value ? createCommentVNode("", !0) : (openBlock(), createBlock(le, {
				key: 1,
				"render-error": unref(ne),
				"render-error-details": unref(ie),
				"error-text": L.value.i18n.tooltips.renderErrorText,
				"show-details-text": L.value.i18n.tooltips.toggleErrorDetailsText,
				"hide-details-text": L.value.i18n.tooltips.toggleErrorDetailsHideText
			}, null, 8, [
				"render-error",
				"render-error-details",
				"error-text",
				"show-details-text",
				"hide-details-text"
			])),
			createBaseVNode("div", {
				ref_key: "diagramWrapper",
				ref: he,
				class: "diagram-wrapper",
				tabindex: T.value ? void 0 : 0,
				role: T.value ? void 0 : "img",
				"aria-label": T.value ? void 0 : unref(ne) ? "Diagram rendering failed" : "Interactive Mermaid diagram",
				onKeydown: r[0] || (r[0] = (e) => !T.value && ((e) => {
					switch (e.key) {
						case "+":
						case "=":
							Ye();
							e.preventDefault();
							break;
						case "-":
							$e();
							e.preventDefault();
							break;
						case "0":
							qe();
							e.preventDefault();
							break;
						case "ArrowUp":
							G();
							e.preventDefault();
							break;
						case "ArrowDown":
							K();
							e.preventDefault();
							break;
						case "ArrowLeft":
							Q();
							e.preventDefault();
							break;
						case "ArrowRight":
							J();
							e.preventDefault();
							break;
						case "f":
							_e();
							e.preventDefault();
					}
				})(e)),
				onMousedown: r[1] || (r[1] = (e) => !T.value && ((e) => {
					Se();
					Y(e);
				})(e)),
				onMousemove: r[2] || (r[2] = (e) => !T.value && void (E.value && $(e))),
				onMouseup: r[3] || (r[3] = (e) => !T.value && Ne()),
				onMouseleave: r[4] || (r[4] = (e) => !T.value && (() => {
					Ne();
					Be();
				})()),
				onWheel: r[5] || (r[5] = (e) => !T.value && ((e) => {
					Ge = e;
					if (!Ze) {
						Ze = !0;
						requestAnimationFrame(() => {
							Ze = !1;
							if (Ge) {
								const e = A.value;
								_(Ge);
								A.value !== e && je();
								Ge = null;
							}
						});
					}
				})(e)),
				onTouchstart: r[6] || (r[6] = (e) => !T.value && N(e)),
				onTouchmove: r[7] || (r[7] = (e) => !T.value && X(e)),
				onTouchend: r[8] || (r[8] = (e) => !T.value && (() => {
					Z();
					Be();
				})())
			}, [T.value ? createCommentVNode("", !0) : (openBlock(), createElementBlock("span", ze, toDisplayString(unref(re) ? "Diagram loaded" : "Loading diagram…"), 1)), createBaseVNode("div", {
				ref_key: "viewportRef",
				ref: fe,
				class: normalizeClass(["mermaid-viewport", { "mermaid-zooming": we.value }]),
				style: normalizeStyle({
					transformOrigin: be.value,
					transform: T.value ? void 0 : `scale(${F.value * unref(A)}) translate(${D.value + unref(I)}px, ${H.value + unref(P)}px)`,
					cursor: T.value ? void 0 : unref(E) ? "grabbing" : "grab"
				})
			}, [createBaseVNode("div", {
				id: Oe,
				class: "mermaid",
				"aria-label": `Mermaid diagram: ${l.code.slice(0, 80)}`,
				style: normalizeStyle({ opacity: unref(re) ? 1 : 0 })
			}, toDisplayString(l.code), 13, Le)], 6)], 40, Te)
		], 2)) : createCommentVNode("", !0)], 64));
	}
});
var De = class e {
	static instance;
	config;
	staticMode;
	toolbarConfig;
	initialized = !1;
	renderAttempts = 0;
	maxRenderAttempts = 5;
	retryTimeout = null;
	renderQueue = [];
	isRendering = !1;
	initialPageRenderComplete = !1;
	hydrationComplete = !1;
	mutationObserver = null;
	lazyObserver = null;
	constructor(e) {
		const { static: t = !1, ...r } = e ?? {};
		this.config = this.deepMerge({}, r);
		this.staticMode = t;
		this.toolbarConfig = Ce();
		this.initialize();
	}
	static getInstance(t) {
		e.instance ? t && e.instance.setOptions(t) : e.instance = new e(t);
		return e.instance;
	}
	static resetInstance() {
		if (e.instance) {
			e.instance.destroy();
			e.instance = void 0;
		}
	}
	boundRouteChangeHandler = null;
	destroy() {
		if (this.mutationObserver) {
			this.mutationObserver.disconnect();
			this.mutationObserver = null;
		}
		if (this.lazyObserver) {
			this.lazyObserver.disconnect();
			this.lazyObserver = null;
		}
		if (this.retryTimeout) {
			clearTimeout(this.retryTimeout);
			this.retryTimeout = null;
		}
		if (this.boundRouteChangeHandler) {
			window.removeEventListener("popstate", this.boundRouteChangeHandler);
			document.removeEventListener("vitepress:routeChanged", this.boundRouteChangeHandler);
			this.boundRouteChangeHandler = null;
		}
	}
	deepMerge(e, t) {
		const r = { ...e };
		for (const o of Object.keys(t)) {
			const n = t[o], i = e[o];
			r[o] = n && "object" == typeof n && !Array.isArray(n) && i && "object" == typeof i && !Array.isArray(i) ? this.deepMerge(i, n) : n;
		}
		return r;
	}
	setConfig(e) {
		this.config = this.deepMerge(this.config, e);
		this.dispatchConfigUpdate();
	}
	setOptions(e) {
		const { static: t, ...r } = e;
		if (void 0 !== t && t !== this.staticMode) {
			this.staticMode = t;
			this.dispatchStaticModeUpdate();
		}
		Object.keys(r).length > 0 && this.setConfig(r);
	}
	setToolbar(e) {
		this.toolbarConfig = Ce(e);
		this.dispatchToolbarUpdate();
	}
	dispatchToolbarUpdate() {
		try {
			if ("undefined" == typeof document) return;
			document.dispatchEvent(new CustomEvent("vitepress-mermaid:toolbar-updated", { detail: this.toolbarConfig }));
		} catch (e) {}
	}
	dispatchConfigUpdate() {
		try {
			document.dispatchEvent(new CustomEvent("vitepress-mermaid:config-updated", { detail: { ...this.config } }));
		} catch (e) {}
	}
	dispatchStaticModeUpdate() {
		try {
			document.dispatchEvent(new CustomEvent("vitepress-mermaid:static-mode-updated", { detail: this.staticMode }));
		} catch (e) {}
	}
	cleanupMermaidWrapper(e) {
		const t = e.getElementsByClassName("copy");
		Array.from(t).forEach((e) => e.remove());
		if (!this.toolbarConfig.showLanguageLabel) {
			const t = e.getElementsByClassName("lang");
			Array.from(t).forEach((e) => e.remove());
		}
		const r = e.getElementsByClassName("line-numbers-wrapper");
		Array.from(r).forEach((e) => e.remove());
		const o = e.getElementsByClassName("line-number");
		Array.from(o).forEach((e) => e.remove());
		e.classList.remove("line-numbers-mode");
		e.classList.remove("has-line-numbers");
		const n = e.getElementsByClassName("line-numbers-mode");
		Array.from(n).forEach((e) => {
			e.classList.remove("line-numbers-mode");
		});
	}
	createMermaidWrapper(e) {
		try {
			const e = document.createElement("div");
			e.id = `mermaid-wrapper-${Math.random().toString(36).slice(2)}`;
			e.className = "mermaid-wrapper";
			return e;
		} catch (t) {
			return null;
		}
	}
	async renderNextDiagram() {
		if (0 === this.renderQueue.length || this.isRendering) return;
		this.isRendering = !0;
		const e = this.renderQueue.shift();
		if (e) try {
			await this.renderMermaidDiagram(e);
		} catch (t) {}
		this.isRendering = !1;
		if (this.renderQueue.length > 0) await this.renderNextDiagram();
		else if (!this.initialPageRenderComplete) {
			this.initialPageRenderComplete = !0;
			this.hydrationComplete = !0;
		}
	}
	async renderMermaidDiagram(e) {
		try {
			if (!e || !e.parentNode) return;
			const t = e.textContent?.trim() || "", r = this.createMermaidWrapper(t);
			if (!r) return;
			e.parentNode.replaceChild(r, e);
			render$1(h(Fe, {
				code: t,
				config: this.config,
				toolbar: this.toolbarConfig,
				static: this.staticMode
			}), r);
			await new Promise((e) => {
				requestAnimationFrame(() => {
					requestAnimationFrame(() => e());
				});
			});
		} catch (t) {}
	}
	initialize() {
		if (!this.initialized) try {
			const e = () => {
				document && document.body && Promise.resolve().then(() => {
					requestAnimationFrame(() => {
						try {
							this.setupDomMutationObserver();
							this.initializeRenderer();
						} catch (e) {}
					});
				});
			};
			"loading" === document.readyState ? document.addEventListener("DOMContentLoaded", e, { once: !0 }) : e();
			const t = () => {
				try {
					this.handleRouteChange();
				} catch (e) {}
			};
			this.boundRouteChangeHandler = t;
			window.addEventListener("popstate", t);
			document.addEventListener("vitepress:routeChanged", t);
			document.addEventListener("vitepress:ready", () => {
				this.renderWithRetry();
			}, { once: !0 });
			"undefined" != typeof window && setTimeout(() => {
				this.renderWithRetry();
			}, 500);
			this.initialized = !0;
		} catch (e) {
			throw e;
		}
	}
	setupDomMutationObserver() {
		if ("undefined" == typeof window || "undefined" == typeof MutationObserver || "undefined" == typeof document) return;
		const e = document.getElementById("app") || document.querySelector(".Layout") || document.body;
		if (!e) return;
		this.mutationObserver && this.mutationObserver.disconnect();
		let t = !1;
		this.mutationObserver = new MutationObserver((e) => {
			if (this.hasNewMermaidNodes(e) && !t) {
				t = !0;
				requestAnimationFrame(() => {
					t = !1;
					this.handleRouteChange();
				});
			}
		});
		try {
			this.mutationObserver.observe(e, {
				childList: !0,
				subtree: !0,
				attributes: !1
			});
		} catch (r) {}
	}
	hasNewMermaidNodes(e) {
		return e.some((e) => Array.from(e.addedNodes).some((e) => this.nodeContainsMermaidCode(e)));
	}
	nodeContainsMermaidCode(e) {
		if (!e) return !1;
		if (e.nodeType === Node.ELEMENT_NODE) {
			const t = e;
			if (t.closest(".mermaid-wrapper")) return !1;
			if (t.classList.contains("language-mermaid") || t.matches?.("code.mermaid")) return !0;
			if (t.querySelector(".language-mermaid, pre.language-mermaid, code.language-mermaid, code.mermaid")) return !0;
		}
		return !(e.nodeType !== Node.DOCUMENT_FRAGMENT_NODE || !e.hasChildNodes()) && Array.from(e.childNodes).some((e) => this.nodeContainsMermaidCode(e));
	}
	initializeRenderer() {
		this.renderAttempts = 0;
		this.initialPageRenderComplete = !1;
		this.renderWithRetry();
	}
	handleRouteChange() {
		this.renderAttempts = 0;
		this.initialPageRenderComplete = !1;
		se = Promise.resolve();
		if (this.retryTimeout) {
			clearTimeout(this.retryTimeout);
			this.retryTimeout = null;
		}
		if (this.lazyObserver) {
			this.lazyObserver.disconnect();
			this.lazyObserver = null;
		}
		this.renderWithRetry();
	}
	renderWithRetry() {
		if (!this.renderMermaidDiagrams() && !this.mutationObserver && this.renderAttempts < this.maxRenderAttempts) {
			const e = Math.min(300 * Math.pow(1.4, this.renderAttempts), 1e4);
			this.retryTimeout && clearTimeout(this.retryTimeout);
			this.retryTimeout = setTimeout(() => {
				this.renderAttempts++;
				this.renderWithRetry();
			}, e);
		}
	}
	renderMermaidDiagrams() {
		try {
			const e = [], t = /* @__PURE__ */ new Set();
			document.querySelectorAll("pre > code.mermaid, pre > code.language-mermaid").forEach((r) => {
				const o = r.parentElement;
				if (o && o instanceof HTMLPreElement && !t.has(o) && !o.hasAttribute("data-mermaid-processed")) {
					t.add(o);
					e.push(o);
					o.setAttribute("data-mermaid-processed", "");
				}
			});
			const r = document.getElementsByClassName("language-mermaid");
			Array.from(r).forEach((r) => {
				if ("code" === r.tagName.toLowerCase()) return;
				const o = r.querySelector("pre");
				if (o && o instanceof HTMLPreElement && !t.has(o) && !o.hasAttribute("data-mermaid-processed")) {
					t.add(o);
					e.push(o);
					o.setAttribute("data-mermaid-processed", "");
				}
				if (r instanceof HTMLPreElement && !t.has(r) && !r.hasAttribute("data-mermaid-processed")) {
					t.add(r);
					e.push(r);
					r.setAttribute("data-mermaid-processed", "");
				}
			});
			if (0 === e.length) return !1;
			e.forEach((e) => {
				const t = e.closest(".language-mermaid");
				t && this.cleanupMermaidWrapper(t);
			});
			const o = [], n = [], i = "undefined" != typeof IntersectionObserver;
			for (const a of e) {
				if (a.closest(".mermaid-wrapper")) continue;
				if (!i) {
					o.push(a);
					continue;
				}
				const e = a.getBoundingClientRect();
				0 !== window.innerWidth && 0 !== window.innerHeight ? 0 === e.width && 0 === e.height || e.top < window.innerHeight && e.bottom > 0 && e.left < window.innerWidth && e.right > 0 ? o.push(a) : n.push(a) : o.push(a);
			}
			if (o.length > 0) {
				this.renderQueue.push(...o);
				this.isRendering || this.renderNextDiagram();
			}
			n.length > 0 && this.observeOffscreenElements(n);
			return o.length > 0 || n.length > 0;
		} catch (e) {
			return !1;
		}
	}
	observeOffscreenElements(e) {
		this.lazyObserver || (this.lazyObserver = new IntersectionObserver((e) => {
			const t = [];
			for (const r of e) if (r.isIntersecting) {
				const e = r.target;
				this.lazyObserver.unobserve(e);
				t.push(e);
			}
			if (t.length > 0) {
				this.renderQueue.push(...t);
				this.isRendering || this.renderNextDiagram();
			}
		}, {
			rootMargin: "200px 0px",
			threshold: 0
		}));
		for (const t of e) this.lazyObserver.observe(t);
	}
};
var He = "vitepress-mermaid-renderer-styles";
var Oe = !1;
var We = "undefined" != typeof window && "undefined" != typeof document;
var Ae = {
	setToolbar: () => {},
	resetInstance: () => {}
};
We && (() => {
	if (Oe || "undefined" == typeof document) return;
	if (document.getElementById(He)) {
		Oe = !0;
		return;
	}
	const e = document.createElement("style");
	e.id = He;
	e.textContent = ".mermaid-container{--mermaid-control-bg:var(--vp-c-bg);--mermaid-control-text:var(--vp-c-text-1);--mermaid-control-text-active:var(--vp-c-brand);--mermaid-control-border:transparent;--mermaid-control-shadow:0 2px 4px #0000001a;--mermaid-control-radius:.375rem;--mermaid-control-padding:.375rem;--mermaid-control-gap:.375rem;--mermaid-control-button-radius:.25rem;--mermaid-control-button-padding:.375rem;--mermaid-control-button-min-size:auto;--mermaid-control-icon-size:18px;--mermaid-spinner-duration:.8s;--mermaid-notification-duration:2s;--mermaid-error-bg:var(--vp-c-bg-soft);--mermaid-error-border:var(--vp-c-border);--mermaid-error-text:var(--vp-c-danger);width:100%;min-height:20rem;max-height:50vh;position:relative;overflow:hidden!important}.static-mermaid-container{min-height:0;max-height:none;background:0 0!important;overflow:visible!important}.mermaid-container.dialog-fullscreen-active{z-index:1002;border:1px solid var(--vp-c-border);background:var(--vp-c-bg);border-radius:.75rem;width:min(94vw,1200px);height:min(90vh,860px);max-height:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 24px 60px #00000040}.mermaid-dialog-backdrop{z-index:1001;backdrop-filter:blur(4px)saturate(115%);background:#00000080;position:fixed;inset:0}@supports (backdrop-filter:blur(1px)){.mermaid-dialog-backdrop{background:color-mix(in srgb, var(--vp-c-bg) 40%, transparent)}}body.mermaid-dialog-open{overflow:hidden}.controls{z-index:20;align-items:center;gap:var(--mermaid-control-gap);max-width:calc(100% - 1.5rem);padding:var(--mermaid-control-padding);border-radius:var(--mermaid-control-radius);box-shadow:var(--mermaid-control-shadow);opacity:1;visibility:visible;pointer-events:auto;background:var(--mermaid-control-bg);color:var(--mermaid-control-text);flex-wrap:wrap;transition:all .2s;display:inline-flex;position:absolute;inset:auto .75rem .75rem auto}.controls.toolbar-vertical-top{top:.75rem;bottom:auto}.controls.toolbar-vertical-bottom{top:auto;bottom:.75rem}.controls.toolbar-horizontal-left{left:.75rem;right:auto}.controls.toolbar-horizontal-right{left:auto;right:.75rem}.controls .toolbar-items{align-items:center;gap:var(--mermaid-control-gap);flex-wrap:wrap;display:inline-flex}.mobile-utility-controls{align-items:center;gap:var(--mermaid-control-gap);flex-wrap:wrap;display:flex}.controls button{min-width:var(--mermaid-control-button-min-size);min-height:var(--mermaid-control-button-min-size);padding:var(--mermaid-control-button-padding);border:1px solid var(--mermaid-control-border);border-radius:var(--mermaid-control-button-radius);background:var(--mermaid-control-bg);color:inherit;cursor:pointer;place-items:center;transition:all .2s;display:grid;position:relative}.controls button:hover{background:var(--vp-c-bg-soft);color:var(--mermaid-control-text-active);transform:translateY(-1px)}.controls button:active{transform:translateY(0)}.controls button svg{width:var(--mermaid-control-icon-size);height:var(--mermaid-control-icon-size);transition:transform .2s}.controls button:hover svg{transform:scale(1.1)}.controls.is-collapsed .toolbar-toggle svg{transform:rotate(180deg)}.controls.is-collapsed .toolbar-toggle:hover svg{transform:rotate(180deg)scale(1.1)}.mobile-controls{--mermaid-control-padding:.5rem;--mermaid-control-gap:.5rem;--mermaid-control-button-min-size:2.75rem;--mermaid-control-icon-size:20px;display:none}.zoom-level{text-align:center;min-width:3.25rem;color:var(--vp-c-text-2);-webkit-user-select:none;user-select:none;background:var(--mermaid-control-bg);border-radius:var(--mermaid-control-button-radius);padding:.25rem .375rem;font-size:.75rem;font-weight:500}@media (width<=768px){.desktop-controls{display:none}.mobile-controls{display:inline-flex}}@media (width>=769px){.mobile-controls{display:none}.desktop-controls{display:inline-flex}}.mermaid-container:fullscreen .controls,.mermaid-container.dialog-fullscreen-active .controls{opacity:1!important;transform:translateY(0)!important}.diagram-wrapper{z-index:1;position:absolute;inset:0;overflow:hidden}.static-mermaid-container .diagram-wrapper{height:auto;min-height:0;position:relative;inset:auto;overflow:visible;background:0 0!important}.mermaid-container:fullscreen .diagram-wrapper{background:var(--vp-c-bg);color:var(--vp-c-text-1);touch-action:none;justify-content:center;align-items:center;max-height:none;padding:20px;display:flex}.mermaid-container:fullscreen::backdrop{background:var(--vp-c-bg-soft)}.mermaid-container.dialog-fullscreen-active .diagram-wrapper{background:var(--vp-c-bg);color:var(--vp-c-text-1);touch-action:none;justify-content:center;align-items:center;min-height:100%;max-height:none;padding:20px;display:flex}@media (width<=768px){.mermaid-container.dialog-fullscreen-active{border-radius:.5rem;width:96vw;height:88vh}}.mermaid{transition:opacity .3s ease-in-out}.mermaid-viewport{transform-origin:50%;display:inline-block}.mermaid-zooming{transition:transform .3s}.static-mermaid-container .mermaid{display:block;background:0 0!important}.static-mermaid-container .mermaid-viewport{display:block}.static-mermaid-container .mermaid svg{max-width:100%;height:auto;margin-inline:auto;display:block;background:0 0!important}.mermaid-rendering{opacity:.5;position:relative}.mermaid-rendering:after{content:\"\";border:3px solid var(--vp-c-brand);width:30px;height:30px;animation:mermaid-spinner var(--mermaid-spinner-duration) linear infinite;border-top-color:#0000;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}@keyframes mermaid-spinner{to{transform:translate(-50%,-50%)rotate(360deg)}}.copied-notification{background:var(--vp-c-bg);color:var(--vp-c-text-1);border-radius:var(--mermaid-control-radius);white-space:nowrap;opacity:0;animation:fadeInOut var(--mermaid-notification-duration) ease-in-out;box-shadow:var(--mermaid-control-shadow);margin-block-end:.5rem;padding:.375rem .75rem;font-size:.75rem;font-weight:500;position:absolute;bottom:100%;left:50%;transform:translate(-50%)}@keyframes fadeInOut{0%{opacity:0;transform:translate(-50%,.5rem)}10%{opacity:1;transform:translate(-50%)}90%{opacity:1;transform:translate(-50%)}to{opacity:0;transform:translate(-50%,-.5rem)}}.visible-controls{opacity:1!important;visibility:visible!important;pointer-events:auto!important}.diagram-error{background:var(--mermaid-error-bg);border:1px solid var(--mermaid-error-border);z-index:10;border-radius:.5rem;width:max-content;max-width:90%;padding:1rem;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 4px 8px #0000001a}.error-message{color:var(--mermaid-error-text);align-items:center;gap:.75rem;font-weight:500;display:flex}.diagram-error .error-message svg{stroke:var(--vp-c-danger);flex-shrink:0}.error-toggle-button{background:var(--vp-c-bg);border:1px solid var(--vp-c-border);cursor:pointer;border-radius:.25rem;margin-left:auto;padding:.25rem .5rem;font-size:.75rem;transition:all .2s}.error-toggle-button:hover{background:var(--vp-c-bg-mute);transform:translateY(-1px)}.error-details{background:var(--vp-c-bg);white-space:pre-wrap;color:var(--vp-c-text-2);border:1px solid var(--vp-c-border);border-radius:.25rem;max-height:200px;margin-top:1rem;padding:1rem;font-family:monospace;font-size:.85rem;overflow:auto}.language-mermaid .line-numbers-wrapper,.language-mermaid .line-number,.language-mermaid.line-numbers-mode .line-numbers-wrapper,.language-mermaid.line-numbers-mode>pre{display:none!important}.sr-only{clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}@media (prefers-reduced-motion:reduce){.mermaid{transition:none!important}.mermaid-rendering:after{animation:none!important}.copied-notification{opacity:1;animation:none!important}.controls,.controls button,.controls button svg{transition:none!important}}";
	document.head.appendChild(e);
	Oe = !0;
})();
var Ie = (e) => We ? De.getInstance(e) : Ae;
//#endregion
export { De as MermaidRenderer, Ie as createMermaidRenderer };

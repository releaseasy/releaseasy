import { n as __name } from "./chunk-Y2CYZVJY-BeyD3uSL.js";
import { z as log } from "./src-nnofB4Gp.js";
import { b as getConfig, s as common_default } from "./chunk-O7XYJQB3-mKDgYvQm.js";
import { d as interpolateToCurve } from "./chunk-ZIGJFQKS-CX9G_8OE.js";
import { t as insertLookDefs } from "./chunk-DUW6YSOI-BR4U-v9o.js";
import { o as labelHelper } from "./chunk-7INBJB4K-Cqr6ftBk.js";
import { r as insertNode } from "./chunk-5DYCD2WN-CR4S9APN.js";
import { r as insertCluster } from "./chunk-UA2S7LBM-qM4-1ylw.js";
import { a as insertEdgeLabel, c as markers_default, i as insertEdge, l as positionEdgeLabel } from "./chunk-Z7XXMR3K-Dp6XDiuE.js";
//#region node_modules/.pnpm/mermaid@12.0.0/node_modules/mermaid/dist/chunks/mermaid.core/chunk-GNY47TPC.mjs
var internalHelpers = {
	common: common_default,
	getConfig,
	insertCluster,
	insertEdge,
	insertEdgeLabel,
	insertMarkers: markers_default,
	insertNode,
	interpolateToCurve,
	labelHelper,
	log,
	positionEdgeLabel
};
var ELK_ALGORITHMS = [
	"elk.stress",
	"elk.force",
	"elk.mrtree",
	"elk.sporeOverlap",
	"elk.box",
	"elk.rectpacking"
];
var layoutAlgorithms = /* @__PURE__ */ Object.create(null);
var registerLayoutLoaders = /* @__PURE__ */ __name((loaders) => {
	for (const loader of loaders) layoutAlgorithms[loader.name] = loader;
}, "registerLayoutLoaders");
var elkLayoutLoaders = /* @__PURE__ */ __name(() => {
	const loader = /* @__PURE__ */ __name(async () => await import("./elk-276RUBZZ-C4oipdZ-.js"), "loader");
	return [{
		name: "elk",
		loader,
		algorithm: "elk.layered"
	}, ...ELK_ALGORITHMS.map((algorithm) => ({
		name: algorithm,
		loader,
		algorithm
	}))];
}, "elkLayoutLoaders");
(/* @__PURE__ */ __name(() => {
	registerLayoutLoaders([
		{
			name: "dagre",
			loader: /* @__PURE__ */ __name(async () => await import("./dagre-6A5THRUB-BKC6c5b6.js"), "loader")
		},
		{
			name: "swimlane",
			loader: /* @__PURE__ */ __name(async () => await import("./swimlanes-2SLR337P-D4jkdi7W.js"), "loader")
		},
		...[{
			name: "cose-bilkent",
			loader: /* @__PURE__ */ __name(async () => await import("./cose-bilkent-JH36ORCC-CaKH22qQ.js"), "loader")
		}, ...elkLayoutLoaders()]
	]);
}, "registerDefaultLayoutLoaders"))();
var render = /* @__PURE__ */ __name(async (data4Layout, svg) => {
	if (!Object.hasOwn(layoutAlgorithms, data4Layout.layoutAlgorithm)) throw new Error(`Unknown layout algorithm: ${data4Layout.layoutAlgorithm}`);
	if (data4Layout.diagramId) for (const node of data4Layout.nodes) {
		const originalDomId = node.domId || node.id;
		node.domId = `${data4Layout.diagramId}-${originalDomId}`;
	}
	const layoutDefinition = layoutAlgorithms[data4Layout.layoutAlgorithm];
	const layoutRenderer = await layoutDefinition.loader();
	insertLookDefs(svg, data4Layout.config);
	return layoutRenderer.render(data4Layout, svg, internalHelpers, { algorithm: layoutDefinition.algorithm });
}, "render");
var LAST_RESORT_LAYOUT = "dagre";
var getRegisteredLayoutAlgorithm = /* @__PURE__ */ __name((algorithm = "", { fallback = LAST_RESORT_LAYOUT } = {}) => {
	if (Object.hasOwn(layoutAlgorithms, algorithm)) return algorithm;
	for (const candidate of [fallback, LAST_RESORT_LAYOUT]) if (Object.hasOwn(layoutAlgorithms, candidate)) {
		log.warn(`Layout algorithm ${algorithm} is not registered. Using ${candidate} as fallback.`);
		return candidate;
	}
	throw new Error(`Neither layout algorithm ${algorithm}, ${fallback}, nor ${LAST_RESORT_LAYOUT} is registered.`);
}, "getRegisteredLayoutAlgorithm");
//#endregion
export { registerLayoutLoaders as n, render as r, getRegisteredLayoutAlgorithm as t };

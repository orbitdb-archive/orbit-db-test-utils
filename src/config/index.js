import browser from './browser.js'
import node from './node.js'

var isBrowser = new Function('try {return this===window;}catch(e){ return false;}') // eslint-disable-line
var isNode = new Function('try {return this===global;}catch(e){return false;}') // eslint-disable-line

let config;

if (isBrowser()) config = browser;
if (isNode()) config = node;

export default config;

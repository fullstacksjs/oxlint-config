/* AUTO-GENERATED from oxc docs — rule import/no-absolute-path. Do not edit. */

import f from '/foo';
import f from '/some/path';
var f = require('/foo');
var f = require('/some/path');

define('/foo', function(foo){})
require('/foo', function(foo){})

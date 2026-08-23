/* AUTO-GENERATED from oxc docs — rule oxc/no-async-endpoint-handlers. Do not edit. */

const app = express();
app.get('/', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

const router = express.Router();
router.use(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  req.user = user;
  next();
});

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
}
app.post('/user', createUser);

// Async handlers that are imported will not be detected because each
// file is checked in isolation. This does not trigger the rule, but still
// violates it and _will_ result in server crashes.
const asyncHandler = require('./asyncHandler');
app.get('/async', asyncHandler);

const router = require( 'express' ).Router();
const User = require( './user.model' );
const { getById, updateUser, deleteUser } = require( './user.service' );
const { getAll, setUsers } = require( './user.memory.repository' );

router.route( '/' ).get( async (req, res) => {
  const users = await getAll();
  // map user fields to exclude secret fields like "password"
  await res.json( users.map( User.toResponse ) );
} );

router.route( '/' ).post( async (req, res) => {
  try {
    const { name, login, password } = req.body;
    const candidate = User.createUser( name, login, password );
    setUsers([...await getAll(), candidate])
    await res.status( 201 ).json( candidate );

  } catch (e) {
    await res.status( 400 ).json( { msg: 'Bad request' } );
    throw new Error( 'Bad request' );
  }
} );

router.route( `/:id` ).get( async (req, res) => {
  try {
    const users = await getAll();
    const candidate = await getById( users, req.params.id );
    if (candidate) await res.status( 200 ).json( candidate );
    else await res.status( 404 ).json( { msg: 'User not found' } );
  } catch (e) {
    throw new Error( 'Bad request' );
  }

} );
router.route( `/:id` ).put( async (req, res) => {
  try {
    const { name, login, password } = req.body;
    const candidate = await updateUser( login, password, name, req.params.id );
    if (candidate) return res.status( 200 ).json( candidate );
    return res.status( 400 ).json( { msg: 'Bad request' } );

  } catch (e) {
    await res.status( 400 ).json( { msg: 'Bad request' } );
    throw new Error( 'Bad request' );
  }

} );

router.route( '/:id' ).delete( async (req, res) => {
  try {
    const candidate = await deleteUser( req.params.id );
    if (candidate) {
      return res.status( 200 ).json( { msg: 'The user has been deleted' } );
    }
    return res.status( 404 ).json( { msg: 'User not found' } );
  } catch (e) {
    await res.status( 400 ).json( { msg: 'Bad request' } );
    throw new Error( 'Bad request' );
  }
} );


module.exports = router;

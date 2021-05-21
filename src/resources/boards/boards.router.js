const router = require( 'express' ).Router();
const { getBoardById, deleteBoard, updateBoard, getAllBoards, createBoard } = require( './boards.service' );

router.route( '/' ).get( async (req, res) => {
  const boards = await getAllBoards();
  return res.status( 200 ).json( boards );
} );
router.route( '/' ).post( async (req, res) => {
  try {
    const { title, columns } = req.body;
    const candidate = await createBoard( title, columns );
    return res.status( 201 ).json( candidate );
  } catch (e) {
    return res.status( 400 ).json( { msg: 'Bad request' } );
  }
} );

router.route( '/:id' ).get( async (req, res) => {
  try {
    const candidate = await getBoardById( req.params.id );
    if (candidate) return res.status( 200 ).json( candidate );
    return res.status( 404 ).json( { msg: 'Board not found' } );
  } catch (e) {
    return res.status( 400 ).json( { msg: 'Bad request' } );
  }
} );

router.route( '/:id' ).put( async (req, res) => {
  const candidate = await updateBoard( req.body, req.params.id );
  if (candidate) return res.status( 200 ).json( candidate );
  return res.status( 400 ).json( { msg: 'Bad request' } );
} );

router.route( '/:id' ).delete( async (req, res) => {
  try {
    const candidate = await deleteBoard( req.params.id );
    if (candidate) {
      return res.status( 200 ).json( { msg: 'Board has been deleted' } );
    }
    return res.status( 404 ).json( { msg: 'Board not found' } );
  } catch (e) {
    return res.status( 400 ).json( { msg: 'Bad request' } );
  }
} );

module.exports = router;
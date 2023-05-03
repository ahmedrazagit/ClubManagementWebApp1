import React, { useEffect, useState } from 'react';
import './forum.scss';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { byteSize, Translate, TextFormat, getSortState, ValidatedField, translate, ValidatedForm, openFile } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPost } from 'app/shared/model/post.model';
import { getEntities, reset } from 'app/entities/post/post.reducer';

import { getEntities as getComments, getEntity } from 'app/entities/comments/comments.reducer';
import { FaComments, FaThumbsUp, FaUsers } from 'react-icons/fa';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import { getEntities as getPosts } from 'app/entities/post/post.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IComments } from 'app/shared/model/comments.model';
import { updateEntity, createEntity, reset as commentreset } from 'app/entities/comments/comments.reducer';
import { v4 as uuidv4 } from 'uuid';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';

export const Forum = () => {
  useEffect(() => {
    document.title = 'Forum';
  }, []);

  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );
  const [sorting, setSorting] = useState(false);

  const postList = useAppSelector(state => state.post.entities);
  const loading = useAppSelector(state => state.post.loading);
  const totalItems = useAppSelector(state => state.post.totalItems);
  const links = useAppSelector(state => state.post.links);
  const entity = useAppSelector(state => state.post.entity);
  const updateSuccess = useAppSelector(state => state.post.updateSuccess);

  //Added by KB

  //const isAdmin = useAppSelector(state => state.authentication.account && state.authentication.account.authorities.includes('ROLE_ADMIN'));

  /*const isAdmin = useAppSelector(state => {
    const account = state.authentication.account;
    return account && account.authorities.indexOf('ROLE_ADMIN') !== -1;
  });*/

  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

  const currentUser = useAppSelector(state => state.authentication.account);

  const isCurrentUserPost = post => {
    return isAuthenticated && post.user && post.user.login === currentUser.login;
  };

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const resetAll = () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  useEffect(() => {
    resetAll();
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      resetAll();
    }
  }, [updateSuccess]);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if ((window as any).pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting]);

  const sort = p => () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
    setSorting(true);
  };

  const handleSyncList = () => {
    resetAll();
  };

  const entityTable = document.querySelector('[data-cy="entityTable"]');

  const [showComments, setShowComments] = useState({});

  const toggleComments = postId => {
    setShowComments(prevState => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  //Comments code

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const posts = useAppSelector(state => state.post.entities);
  const users = useAppSelector(state => state.userManagement.users);
  const commentsEntity = useAppSelector(state => state.comments.entity);
  const updating = useAppSelector(state => state.comments.updating);
  const updateCommentSuccess = useAppSelector(state => state.comments.updateSuccess); //changed
  const commentsList = useAppSelector(state => state.comments.entities);
  const loadingComment = useAppSelector(state => state.comments.loading); //changed

  const handleClose = () => {
    navigate('/forum');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(commentreset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPosts({}));
    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateCommentSuccess) {
      handleClose();
    }
  }, [updateCommentSuccess]);

  {
    /*const saveEntity = values => {
    const entity = {
      ...commentsEntity,
      ...values,
      post: posts.find(it => it.id.toString() === values.post.toString()),
      user: users.find(it => it.id.toString() === values.user.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };
  */
  }

  const saveEntity = values => {
    const entity = {
      ...commentsEntity,
      ...values,
      post: posts.find(it => it.id.toString() === values.post.toString()),
      user: users.find(it => it.id.toString() === values.user.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity)).then(() => {
        window.location.reload();
      });
    } else {
      dispatch(updateEntity(entity)).then(() => {
        window.location.reload();
      });
    }
  };

  const resetForm = () => {
    // Reset the comment textarea
    (document.getElementById('comments-comment') as HTMLInputElement).value = '';

    // Reset the post and user select fields (if necessary)
    // document.getElementById('comments-post').value = '';
    // document.getElementById('comments-user').value = '';
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...commentsEntity,
          post: commentsEntity?.post?.id,
          user: commentsEntity?.user?.id,
        };

  useEffect(() => {
    dispatch(getComments({}));
  }, []);

  const handleSyncCommentList = () => {
    dispatch(getComments({}));
  };

  const isCurrentUserComment = comments => {
    return isAuthenticated && comments.user && comments.user.login === currentUser.login;
  };

  //End of Comments code

  //SearchBar and Comment button

  {
    /*const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(postList);

  useEffect(() => {
    setFilteredPosts(postList.filter(post => post.title.toLowerCase().includes(searchText.toLowerCase())));
  }, [postList, searchText]);
  */
  }

  const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(postList);

  useEffect(() => {
    setFilteredPosts(postList.filter(post => post.title.toLowerCase().includes(searchText.toLowerCase())));
  }, [postList, searchText]);

  // Announcements filter
  const [showAnnouncements, setShowAnnouncements] = useState(false);

  const [filter, setFilter] = useState('');

  const handleFilter = filter => {
    if (filter === 'Announcements') {
      setShowAnnouncements(true);
    } else {
      setShowAnnouncements(false);
    }
  };

  const selectFilter = event => {
    setFilter(event.target.value);
    handleFilter(filter);
  };

  const [filterAnnouncements, setFilterAnnouncement] = useState([]);

  useEffect(() => {
    setFilterAnnouncement(postList.filter(post => post.annoncement === true));
  }, [postList]);

  // Combined filter
  let filteredData = useState(postList);
  filteredData = showAnnouncements ? filterAnnouncements : filteredPosts;
  //End of Announcements filter

  return (
    <div
      style={{
        background: 'linear-gradient(45deg, #ffb6c1, #87ceeb)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 style={{ textAlign: 'center', border: '0px', color: 'white', fontWeight: 'bold' }}>Forum</h1>

      <div className="forum">
        <div className="search-bar" style={{ margin: '5px', border: '0px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />

          {/*<Button className="btn btn-outline-secondary" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="teamprojectApp.post.home.refreshListLabel">Refresh List</Translate>
          </Button>*/}

          <button className="btn btn-primary my-button" onClick={handleSyncList} disabled={loading}>
            <span className="bi bi-arrow-counterclockwise" style={{ marginRight: '5px' }}></span>
            <Translate contentKey="teamprojectApp.post.home.refreshListLabel">Refresh List</Translate>
          </button>

          {/*<select value={filter} onChange={(event) => selectFilter(event.target.value)}>
            <option value="All Posts">All posts</option>
            <option value="Announcements">Announcements</option>
          </select>*/}

          {/*<select className="form-select" aria-label="Default select example">
            <option selected onClick={() => {
              handleFilter('All posts');
            }}>Open this select menu</option>
            <option value="1"
                    onClick={() => {
                      handleFilter('Announcements');
                      console.log(filterAnnouncements);
                    }}
            >Announcements</option>
          </select>*/}

          <DropdownButton title="Filter posts">
            <Dropdown.Item
              onClick={() => {
                handleFilter('All posts');
              }}
            >
              All posts
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                handleFilter('Announcements');
                console.log(filterAnnouncements);
              }}
            >
              Announcements
            </Dropdown.Item>
          </DropdownButton>

          <Link to="/post/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="teamprojectApp.post.home.createLabel">Create new Post</Translate>
          </Link>
        </div>

        <InfiniteScroll
          dataLength={filteredData ? filteredData.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {filteredData && filteredData.length > 0 ? (
            <>
              {filteredData.map((post, i) => (
                <div
                  key={`entity-${i}`}
                  data-cy="entityTable"
                  onClick={() => {
                    //navigate(`/post/${post.id}`);
                  }}
                >
                  <div className="container-fluid mt-100">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="card mb-4 forumcard">
                          {/*<div className="card-header">
                            <div className="media flex-wrap w-100 align-items-center">
                              {post.annoncement ? (
                                <button type="button" className="btn btn-outline-warning btn-sm">
                                  Announcement
                                </button>
                              ) : (
                                <button type="button" className="btn btn-outline-success btn-sm">
                                  General Post
                                </button>
                              )}
                              <div style={{ textAlign: 'center', fontSize: '20px' }}>
                                <strong>{post.title}</strong>
                              </div>

                              <div className="text-muted small ml-3">
                                <div>
                                  Posted at{' '}
                                  <strong>
                                    {post.date ? <TextFormat type="date" value={post.date} format={APP_DATE_FORMAT} /> : null}
                                  </strong>{' '}
                                  by {post.user ? post.user.login : ''}
                                </div>
                              </div>
                            </div>
                          </div>*/}
                          <div className={post.annoncement ? 'card-header bg-warning' : 'card-header'}>
                            <div className="media flex-wrap w-100 align-items-center">
                              {/*{post.annoncement ? (
                                <div className = "bg-washed-yellow">Announcement</div>
                              ) : (
                                <div className = "bg-washed-green">General Post</div>
                              )}*/}
                              {post.annoncement && (
                                <div className="mr-2">
                                  <FontAwesomeIcon icon={faBullhorn} size="2x" />
                                </div>
                              )}
                              <div style={{ textAlign: 'center', fontSize: '30px' }}>
                                <strong>{post.title}</strong>
                              </div>

                              {/*<div className="text-muted small ml-3 font-weight-bold">
                                <div>
                                  Posted at{' '}
                                  <strong>
                                    {post.date ? <TextFormat type="date" value={post.date} format={APP_DATE_FORMAT} /> : null}
                                  </strong>{' '}
                                  by {post.user ? post.user.login : ''}
                                </div>
                              </div>*/}

                              <div style={{ color: 'white', textShadow: '1px 1px 0px black' }}>
                                <span style={{ fontWeight: 'bold' }}>Posted at</span>{' '}
                                <strong style={{ fontWeight: 'bold' }}>
                                  {post.date ? <TextFormat type="date" value={post.date} format={APP_DATE_FORMAT} /> : null}
                                </strong>{' '}
                                <span style={{ fontWeight: 'bold' }}>by</span> {post.user ? post.user.login : ''}
                              </div>
                            </div>
                          </div>

                          <div className="card-body">
                            <p style={{ textAlign: 'center', margin: '4px' }}>{post.content}</p>
                            {post.image ? (
                              <div style={{ textAlign: 'center' }}>
                                {post.imageContentType ? (
                                  <img
                                    src={`data:${post.imageContentType};base64,${post.image}`}
                                    style={{ height: '300px', width: '300px' }}
                                  />
                                ) : null}
                                <span>{/*{post.imageContentType}, {byteSize(post.image)}*/}</span>
                              </div>
                            ) : null}
                          </div>
                          <div className="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
                            <div className="px-4 pt-3">
                              <div className="btn-group flex-btn-group-container ml-auto">
                                {/*<Button tag={Link} to={`/post/${post.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                                  <FontAwesomeIcon icon="eye" />{' '}
                                  <span className="d-none d-md-inline">
                                    <Translate contentKey="entity.action.view">View</Translate>
                                  </span>
                                </Button>*/}
                                {isCurrentUserPost(post) && (
                                  <>
                                    <Button tag={Link} to={`/post/${post.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                                      <FontAwesomeIcon icon="pencil-alt" />{' '}
                                      <span className="d-none d-md-inline">
                                        <Translate contentKey="entity.action.edit">Edit</Translate>
                                      </span>
                                    </Button>
                                    <Button tag={Link} to={`/post/${post.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                                      <FontAwesomeIcon icon="trash" />{' '}
                                      <span className="d-none d-md-inline">
                                        <Translate contentKey="entity.action.delete">Delete</Translate>
                                      </span>
                                    </Button>
                                  </>
                                )}
                                <Button color="primary" size="sm" onClick={() => toggleComments(post.id)}>
                                  {showComments[post.id] ? 'Hide' : <FaComments />} {'Comments'}
                                </Button>
                              </div>
                            </div>

                            <div className="container mt-3 d-flex justify-content-start">
                              <div className="row d-flex justify-content-start">
                                <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
                                  {!isNew ? (
                                    <ValidatedField
                                      name="id"
                                      required
                                      readOnly
                                      id="comments-id"
                                      label={translate('global.field.id')}
                                      validate={{ required: true }}
                                    />
                                  ) : null}
                                  <ValidatedField
                                    label={translate('teamprojectApp.comments.comment')}
                                    id="comments-comment"
                                    name="comment"
                                    data-cy="comment"
                                    type="textarea"
                                    validate={{
                                      required: { value: true, message: translate('entity.validation.required') },
                                    }}
                                  />
                                  <ValidatedField style={{ display: 'none' }} id="comments-post" name="post" data-cy="post" type="select">
                                    <option value={post.id} />
                                  </ValidatedField>
                                  <ValidatedField style={{ display: 'none' }} id="comments-user" name="user" data-cy="user" type="select">
                                    <option value="" />
                                  </ValidatedField>
                                  &nbsp; &nbsp;
                                  <Button
                                    color="primary"
                                    id="save-entity"
                                    data-cy="entityCreateSaveButton"
                                    type="submit"
                                    disabled={updating}
                                    onClick={() => {
                                      (document.getElementById('comments-comment') as HTMLInputElement).value = '';
                                    }}
                                    style={{ marginBottom: '4px' }}
                                  >
                                    <FontAwesomeIcon icon="save" />
                                    &nbsp;
                                    <Translate contentKey="entity.action.save">Save Comment</Translate>
                                  </Button>
                                </ValidatedForm>

                                {/*
                                            <div className="col-md-8">
                                                <div className="card p-3 mb-2">
                                                  <div className="d-flex flex-row">
                                                    <div className="d-flex flex-column ms-2">
                                                      <h6 className="mb-1 text-primary">{comment.user ? comment.user.login : ''}</h6>
                                                      <p className="comment-text">{comment.comment}</p>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="d-flex flex-row gap-3 align-items-center">
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            */}

                                {post && showComments[post.id] && (
                                  <div className="table-responsive-comment text-end">
                                    {commentsList && commentsList.length > 0 ? (
                                      <div>
                                        {commentsList.map((comment, i) =>
                                          comment.post && comment.post.id === post.id ? (
                                            <div key={`entity-${i}`} data-cy="entityTableComment">
                                              <div className="col-md-8">
                                                <div className="card p-3 mb-2">
                                                  <div className="d-flex flex-row">
                                                    <div className="d-flex flex-column ms-2">
                                                      <h6 className="mb-1 text-primary">{comment.user ? comment.user.login : ''}</h6>
                                                      <p className="comment-text">{comment.comment}</p>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="d-flex flex-row gap-3 align-items-center"></div>
                                                  </div>
                                                  {isCurrentUserComment(comment) && (
                                                    <>
                                                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                        <Button
                                                          tag={Link}
                                                          to={`/comments/${comment.id}/edit`}
                                                          color="primary"
                                                          style={{ fontSize: '12px', padding: '4px 8px' }}
                                                          data-cy="entityEditButton"
                                                        >
                                                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                                                          <span className="d-none d-md-inline">
                                                            <Translate contentKey="entity.action.edit">Edit</Translate>
                                                          </span>
                                                        </Button>

                                                        <Button
                                                          tag={Link}
                                                          to={`/comments/${comment.id}/delete`}
                                                          color="danger"
                                                          style={{ fontSize: '12px', padding: '4px 8px' }}
                                                          data-cy="entityDeleteButton"
                                                        >
                                                          <FontAwesomeIcon icon="trash" />{' '}
                                                          <span className="d-none d-md-inline">
                                                            <Translate contentKey="entity.action.delete">Delete</Translate>
                                                          </span>
                                                        </Button>
                                                      </div>
                                                    </>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          ) : null
                                        )}
                                        {commentsList.filter(comment => comment.post && comment.post.id === post.id).length === 0 && (
                                          <div className="text-start">
                                            <p>No Comments</p>
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <p>No Comments</p>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-end"></div>
                </div>
              ))}
            </>
          ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="teamprojectApp.post.home.notFound">No Posts found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};
export default Forum;

import React, { useEffect, useState } from 'react';
import './forum.scss';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { byteSize, Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPost } from 'app/shared/model/post.model';
import { getEntities, reset } from 'app/entities/post/post.reducer';

import { getEntities as getComments } from 'app/entities/comments/comments.reducer';

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

  //const isAdmin = useAppSelector(state => state.authentication.account.authorities.includes('ROLE_ADMIN'));

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

  //SearchBar and Comment button

  const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(postList);

  useEffect(() => {
    setFilteredPosts(postList.filter(post => post.title.toLowerCase().includes(searchText.toLowerCase())));
  }, [postList, searchText]);

  const entityTable = document.querySelector('[data-cy="entityTable"]');

  const [showComments, setShowComments] = useState({});

  const toggleComments = postId => {
    setShowComments(prevState => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  //Comments code
  const commentsList = useAppSelector(state => state.comments.entities);
  const loadingComment = useAppSelector(state => state.comments.loading);

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

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Forum</h1>
      <div className="forum">
        <div className="input-group mb-3" style={{ marginRight: '5px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">
              Search
            </button>
          </div>

          <Button className="btn btn-outline-secondary" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="teamprojectApp.post.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/post/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="teamprojectApp.post.home.createLabel">Create new Post</Translate>
          </Link>
        </div>
        <InfiniteScroll
          dataLength={filteredPosts ? filteredPosts.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {filteredPosts && filteredPosts.length > 0 ? (
            <>
              {filteredPosts.map((post, i) => (
                <div
                  key={`entity-${i}`}
                  data-cy="entityTable"
                  onClick={() => {
                    //navigate(`/post/${post.id}`);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="container-fluid mt-100">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="card mb-4 forumcard">
                          <div className="card-header">
                            <div className="media flex-wrap w-100 align-items-center">
                              <img src="https://i.imgur.com/iNmBizf.jpg" className="d-block ui-w-40 rounded-circle" alt="" />
                              {/*<div className="media-body ml-3"><a href="#" data-abc="true">{post.user ? post.user.login : ''}</a>
                                <div className="text-muted small">13 days ago</div>
                              </div>*/}

                              <div style={{ textAlign: 'center' }}>
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
                          </div>
                          <div className="card-body">
                            <p>{post.content}</p>
                          </div>
                          <div className="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
                            <div className="px-4 pt-3">
                              <a href="" className="text-muted d-inline-flex align-items-center align-middle" data-abc="true">
                                {' '}
                                <i className="fa fa-heart text-danger"></i>&nbsp; <span className="align-middle"></span>{' '}
                              </a>{' '}
                              <span className="text-muted d-inline-flex align-items-center align-middle ml-4">
                                {' '}
                                <i className="fa fa-eye text-muted fsize-3"></i>&nbsp; <span className="align-middle"></span>{' '}
                              </span>
                            </div>

                            <div className="px-4 pt-3">
                              <div className="btn-group flex-btn-group-container">
                                <Button tag={Link} to={`/post/${post.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                                  <FontAwesomeIcon icon="eye" />{' '}
                                  <span className="d-none d-md-inline">
                                    <Translate contentKey="entity.action.view">View</Translate>
                                  </span>
                                </Button>
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
                                  {showComments[post.id] ? 'Hide Comments' : 'Show Comments'}
                                </Button>
                              </div>
                            </div>

                            {showComments[post.id] && (
                              <>
                                <div className="table-responsive-comment">
                                  {commentsList && commentsList.length > 0 ? (
                                    <div>
                                      {commentsList.map((comments, i) => (
                                        <div key={`entity-${i}`} data-cy="entityTableComment">
                                          <div className="container mt-3">
                                            <div className="row">
                                              <div className="col-md-8">
                                                <div className="text-left">{/*<h6>All comments (5)</h6>*/}</div>
                                                <div className="card p-3 mb-2">
                                                  <div className="d-flex flex-row">
                                                    <div className="d-flex flex-column ms-2">
                                                      <h6 className="mb-1 text-primary">{comments.user ? comments.user.login : ''}</h6>
                                                      <p className="comment-text">{comments.comment}</p>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="d-flex flex-row gap-3 align-items-center">
                                                      <div className="d-flex align-items-center">
                                                        <i className="fa fa-heart-o"></i>
                                                        <span className="ms-1 fs-10">Like</span>
                                                      </div>
                                                      <div className="d-flex align-items-center">
                                                        <i className="fa fa-comment-o"></i>
                                                        <span className="ms-1 fs-10">Comments</span>
                                                      </div>
                                                    </div>
                                                    <div className="d-flex flex-row">
                                                      <span className="text-muted fw-normal fs-10">May 22, 2020 12:10 PM</span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    ''
                                  )}
                                </div>
                              </>
                            )}
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

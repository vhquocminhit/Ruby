import "./todo.css";
import "./header/header";
import "./main/main";
import "./footer/footer";

export const append = data => {
  $(".js-todo-list").append(_template(data))
};

export const update = (value, id) => {
  let request = $.ajax({
    method: "PUT",
    url: Routes.todo_path(id),
    data: { content: value, id: id }
  });
  _requestFail(request);
};

export const remove = id => {
  let request = $.ajax({
    method: "DELETE",
    url: Routes.todo_statuses_path(),
    data: { ids: id }
  });
  _requestFail(request);
  return request;
};

export const clearCompleted = listItem => {
  let request = $.ajax({
    method: "DELETE",
    url: Routes.todo_statuses_path(),
    data: { ids: listItem }
  });
  _requestFail(request);
  return request;
};

export const completed = (id, data) => {
  let request = $.ajax({
    method: "PUT",
    url: Routes.todo_statuses_path(),
    data: { ids: id, completed: data }
  });
  _requestFail(request);
  return request;
};

export const idsCompleted = () => {
  return _fetchIDs( $('.js-todo-list li.completed') );
};

export const idsNotComplete = () => {
  return _fetchIDs( $('.js-todo-list li:not(.completed)') );
};

// ========== PRIVATE FUNCTIONS

const _requestFail = request => {
  request.fail(function(jqXHR, textStatus) {
    alert( "Request failed: " + textStatus );
  });
};

const _template = item => {
  return `<li data-id="${item.id}" data-completed="${item.status}">
    <div class="view">
      <input class="toggle js-toggle-completed" type="checkbox">
      <label class="js-label-item">${item.content}</label>
      <button class="destroy js-destroy-item"></button>
    </div>
    <input class="edit js-edit-item" value="${item.content}">
  </li>`;
};

const _fetchIDs = element => {
  let ids = []
  element.each(function() {
    ids.push( $(this).data('id') );
  });
  return ids;
}

$(document).ready(function () {
  // display tasks
  getAndDisplayAllTasks = function (filter) {


    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/?api_key=388',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#todo-list').empty();

        response.tasks.forEach(function (task) {
          $('#todo-list').append('<div class = "row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');


        })
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    })
  }


  // add tasks
  var newTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=388',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#newTask').val()
        }
      }),
      success: function (response, textStatus) {
        $('#newTask').val('');
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    })
  }

  $('#create-task').on('submit', function (event) {
    event.preventDefault();
    newTask();
  })



  // delete tasks
  var deleteTask = function (id) {

    $.ajax({
      type: 'DELETE',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=388',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    })
  }

  $(document).on('click', '.delete', function () {
    deleteTask($(this).data('id'));
  })

  var markComplete = function (id) {

    $.ajax({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=388',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    })
  }

  var markActive = function (id) {

    $.ajax({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=388',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    })
  }

  $(document).on('change', '.mark-complete', function () {
    if (this.checked) {
      markComplete($(this).data('id'));
    } else {
      markActive($(this).data('id'));
    }
  })


  getAndDisplayAllTasks();

})





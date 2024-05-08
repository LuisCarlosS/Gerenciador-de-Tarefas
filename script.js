$(document).ready(function() {
    function loadTasks() {
        var tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(function(task) {
                addTaskToList(task.text, task.completed);
            });
        }
    }

    function addTaskToList(taskText, completed) {
        var taskId = generateTaskId();
        var taskClass = completed ? 'task completed' : 'task';

        $("#taskList").append("<li draggable='true' id='" + taskId + "' class='" + taskClass + "'><div class='custom-checkbox'><input type='checkbox' id='checkbox_" + taskId + "'" + (completed ? " checked" : "") + "><label for='checkbox_" + taskId + "' class='checkbox-icon'></label><span class='tasks'>" + taskText + "</span></div><div class='buttons'><span class='edit'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z'/></svg></span><span class='delete'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path d='M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z'/></svg></span></div></li>");
    }

    function generateTaskId() {
        var currentDate = new Date().toISOString().slice(0, 19).replace(/[-T]/g, "").replace(/:/g, "");
        var randomNum = Math.floor(Math.random() * 1000) + 1;
        return "task_" + currentDate + "_" + randomNum;
    }

    loadTasks();

    $("#addTaskBtn").click(function() {
        var task = $("#taskInput").val().trim();
        if (task !== "") {
            addTaskToList(task, false);
            saveTasks();
        }
        $("#taskInput").val("");
    });

    $(document).on("click", ".edit", function() {
        var taskText = $(this).closest('li').find('.tasks').text();
        var taskId = $(this).closest('li').attr("id");
        $("#taskInput").val(taskText).addClass("selected");
        $("#addTaskBtn").off("click").on("click", function() {
            editTasks(taskId);
        }).addClass("edit-mode").html("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z'/></svg>");
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    function editTasks(taskId) {
        var task = $("#taskInput").val().trim();
        if (task !== "") {
            $("#" + taskId + " .tasks").text(task);
            $("#taskInput").removeClass("selected");
            $("#addTaskBtn").removeClass("edit-mode").off("click").on("click", function() {
                addTask();
            }).html("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z'/></svg>");
            saveTasks();
        }
        $("#taskInput").val("");
    }

    $("#taskList").sortable({
        update: function(event, ui) {
            saveTasks();
        }
    });

    $("#cancelBtn").click(function() {
        $("#confirmModal").hide();
    });

    $(".close").click(function() {
        $("#confirmModal").hide();
    });

    $(document).on("click", ".delete", function() {
        var taskId = $(this).closest('li').attr("id");
        $("#confirmDeleteBtn").attr("data-id", taskId);
        $("#confirmModal").show();
    });

    $("#confirmDeleteBtn").click(function() {
        var taskId = $(this).attr("data-id");
        $("#" + taskId).remove();
        $("#confirmModal").hide();
        saveTasks();   
    });

    $(document).on("change", ".task input[type='checkbox']", function() {
        var taskElement = $(this).closest('li');
        if ($(this).is(':checked')) {
            taskElement.addClass("completed");
            taskElement.appendTo("#taskList");
        } else {
            taskElement.removeClass("completed");
            taskElement.prependTo("#taskList");
        }
        saveTasks();
    });

    function saveTasks() {
        var tasks = [];
        $(".task").each(function() {
            tasks.push({
                text: $(this).find('.tasks').text().trim(),
                completed: $(this).hasClass('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
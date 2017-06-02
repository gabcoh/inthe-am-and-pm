/*
 * API Key: 16549ccb86cf41c8294d9166bdd4dd62a63a0148
 * This class represents the DAO for inthe.am tasks
 */
import Task from './Task.js';
class Tasks{
    constructor(api_key) {
        this.api_key = api_key;
        this.authorized_header = {"Authorization": "Token "+api_key};
        this.authorized_header_post = {
            "Authorization": "Token "+api_key,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    }
    //Promises to return a list of Task objects
    get_tasks(filter) {
        return fetch("https://inthe.am/api/v2/tasks/", {
            method : "GET",
            headers:this.authorized_header,
            mode:"cors",
        })
            .then(response => {return response.json();})
            .then(tasksJSON => {
                if(filter !== undefined) {
                    //filter the list here
                    return tasksJSON.filter(filter).map(task=> new Task(task));
                }
                return tasksJSON.map(task=> new Task(task));
            });
    }
    get_task_by_id(id) {
        return fetch("https://inthe.am/api/v2/tasks/" + id + "/", {
            method : "GET",
            headers:this.authorized_header,
            mode:"cors",
        })
            .then(response => {return response.json();})
            .then(taskJSON => {
                return Task(taskJSON);
            }).catch(error => {
                console.log(error);
            });
    }
    delete_task(id) {
        fetch("https://inthe.am/api/v2/tasks/" + id + "/delete/", {
            method : "POST",
            headers:this.authorized_header,
            mode:"cors",
        });
    }
    task_done(id) {
        fetch("https://inthe.am/api/v2/tasks/" + id + "/", {
            method : "DELETE",
            headers:this.authorized_header,
            mode:"cors",
        });
    }
    create_task(new_task) {
        console.log(JSON.stringify(new_task));
        fetch("https://inthe.am/api/v2/tasks/", {
            method : "POST",
            body : JSON.stringify(new_task),
            headers:this.authorized_header_post,
            mode:"cors",
        });
    }
    get_configuration() {
        return fetch("https://inthe.am/api/v2/user/status/", {
            method : "GET",
            headers:this.authorized_header,
            mode:"cors",
        });
    }
    is_valid() {
        return true;
    }
}
export default Tasks;

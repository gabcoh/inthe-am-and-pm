
export default class Task {
    constructor(task_object) {
        this.task = task_object;
    }
    get_title() {
        return this.task.description;
    }
    get_priority() {
        return this.task.priority;
    }
    get_due_date(){
        console.log(this.task.due);
        return new Date(this.task.due || '');
    }
    get_tags() {
        return this.task.tags || [];
    }
    get_status() {
        return this.task.status;
    }
    get_annotations() {
        return this.task.annotations || [];
    }
    get_entry() {
        console.log(this.task.entry);
        return new Date(this.task.entry||'');
    }
    get_id() {
        return this.task.id;
    }
    get_urgency() {
        return this.task.urgency;
    }
    get_last_modified() {
        return new Date(this.task.modified||'');
    }
}


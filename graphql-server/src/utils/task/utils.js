export const isValidTask = (args) => {
    return args.task && args.task.title && args.task.category && args.task.endDateTime && args.task.email;
}

export const formatParams = (args) => {
    const params = [];
    params.push(args.task.title);
    params.push(args.task.category);
    params.push(args.task.status);
    params.push(args.task.desc);
    params.push(args.task.startDateTime ? new Date(args.task.startDateTime): null);
    params.push(new Date(args.task.endDateTime));
    params.push(new Date());
    return params;
}

export const isValidUpdateTask = (args) => {
    return args.task.id;
}
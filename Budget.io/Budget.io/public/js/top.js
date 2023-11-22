$(document).ready(() => {
    var taskList = [];

    function buildList() {
        // Remove all contents from the insertion point
        $("#taskList").empty();

        // Loop over the list of tasks...
        for (let task of taskList) {
            // Create a container div for each task
            const containerDiv = $("<div class='input-group mb-3'>");

            // Check if the task is claimed
            const isClaimed = task.claimed || false;

            // Conditionally render the input based on the claimed state
            if (isClaimed) {
                containerDiv.append(`
                    <div class="input-group-text">
                        <input class="form-check-input mt-0 checkbox" type="checkbox" value="" aria-label="Checkbox for following text input">
                    </div>
                    <input type="text" class="form-control task-text" value="${task.name}" aria-label="Text input with checkbox">
                    <div class="button-container">
                        <button class="btn btn-outline-secondary abandon-button" type="button" data-task-name="${task.name}">Abandon</button>
                    </div>
                `);
            } else {
                containerDiv.append(`
                    <input type="text" class="form-control task-text" placeholder="${task.name}" aria-label="Recipient's username" aria-describedby="button-addon2">
                    <button class="btn btn-outline-secondary claim-button" type="button" data-task-name="${task.name}">Claim</button>
                `);
            }

            // If the task is claimed and has a checkbox, check the checkbox
            if (isClaimed) {
                containerDiv.find(".checkbox").prop("checked", true);
            }

            // Append the containerDiv to the task list
            $("#taskList").append(containerDiv);
        }
    }

    // Event delegation for claim and abandon buttons
    $("#taskList").on("click", ".claim-button", function () {
        const taskName = $(this).data("task-name");

        // Find the corresponding task in the taskList
        const task = taskList.find((t) => t.name === taskName);

        // Update the claimed state
        task.claimed = true;

        // Rebuild the list
        buildList();
    });

    $("#taskList").on("click", ".abandon-button", function () {
        const taskName = $(this).data("task-name");

        // Find the corresponding task in the taskList
        const task = taskList.find((t) => t.name === taskName);

        // Update the claimed state
        task.claimed = false;

        // Rebuild the list
        buildList();
    });

    // Event delegation for checkbox
    $("#taskList").on("change", ".checkbox", function () {
        const isChecked = $(this).prop("checked");
        const taskText = $(this).closest(".input-group").find(".task-text");

        // Toggle the "strikethrough" class based on the checkbox state
        taskText.toggleClass("strikethrough", isChecked);
    });

    $("#addButton").click(() => {
        // Find the textbox and get its value
        var taskName = $("#listItem").val();

        // Add the task to the taskList
        taskList.push({ name: taskName, claimed: false });

        // Call the buildList function to update the displayed list
        buildList();

        // Clear the input field for the next entry
        $("#listItem").val('');
    });
});

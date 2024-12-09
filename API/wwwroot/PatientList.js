$(document).ready(function(){
    var currentPage = 1;
    var rowsPerPage = 5;

    function loadTableData(rows, page) {
        var tableBody = $("#patientTable tbody");
        tableBody.empty();

        // جلب البيانات من API
        $.ajax({
            url: `https://localhost:5001/api/patients`, 
            method: "GET",
            success: function(response) {
                console.log("API Response:", response); 
                var start = (currentPage - 1) * rowsPerPage;
                var end = start + rowsPerPage;
                var paginatedItems = response.slice(start, end);

                $.each(paginatedItems, function(index, patient) {
                    var row = $("<tr></tr>");
                    row.append($("<td></td>").text(patient.id));
                    row.append($("<td></td>").text(patient.arabicFullName)); // استخدام الاسم العربي الكامل
                    row.append($("<td></td>").text(patient.englishName));
                    row.append($("<td></td>").text(patient.phoneNumber));
                    row.append($("<td></td>").html('<div class="action-buttons"><button class="view">👁️</button><button class="edit">✏️</button><button class="delete">🗑️</button><button class="add">➕</button></div>'));
                    tableBody.append(row);
                });

                updatePagination(response.length, rowsPerPage, currentPage, start + 1, end);
            },
            error: function(xhr, status, error) {
                console.log("Error Status:", status);
                console.log("Error Details:", error);
                console.log("XHR Object:", xhr); 
                alert("Failed to fetch data from API");
            }
        });
    }

    function updatePagination(totalItems, rowsPerPage, currentPage, currentStart, currentEnd) {
        var totalPages = Math.ceil(totalItems / rowsPerPage);
        $(".current-page").text(currentPage);
        $(".total-pages").text(totalPages);
        $(".page-number").text(currentPage);
        $(".current-start").text(currentStart);
        $(".current-end").text(Math.min(currentEnd, totalItems));
        $(".total-entries").text(totalItems);
    }

    function setupPagination(rowsPerPage) {
        $(".pagination .next").off("click").on("click", function() {
            currentPage++;
            loadTableData(rowsPerPage, currentPage);
        });

        $(".pagination .previous").off("click").on("click", function() {
            if (currentPage > 1) {
                currentPage--;
                loadTableData(rowsPerPage, currentPage);
            }
        });
    }

    loadTableData(rowsPerPage, currentPage);
    setupPagination(rowsPerPage);

    $("#entries").change(function() {
        rowsPerPage = parseInt($(this).val());
        currentPage = 1;
        loadTableData(rowsPerPage, currentPage);
        setupPagination(rowsPerPage);
    });

    // Add
    $(document).on("click", ".add", function() {
        console.log("Add button clicked");
        alert("No page available for adding.");
    });

    // View
    $(document).on("click", ".view", function() {
        console.log("View button clicked");
        alert("No page available for viewing.");
    });

    // Edit
    $(document).on("click", ".edit", function() {
        console.log("Edit button clicked");
        alert("No page available for editing.");
    });

    // Delete
    $(document).on("click", ".delete", function() {
        if (confirm("Are you sure you want to delete this record?")) {
            var row = $(this).closest("tr");
            var id = row.find("td:eq(0)").text();
            $.ajax({
                url: `https://localhost:5001/api/patients/${id}`,
                method: "DELETE",
                success: function(response) {
                    loadTableData(rowsPerPage, currentPage);
                    alert("Record deleted successfully");
                },
                error: function(xhr, status, error) {
                    console.log("Error Status:", status);
                    console.log("Error Details:", error);
                    console.log("XHR Object:", xhr);
                    alert("Failed to delete data: " + xhr.responseText);
                }
            });
        }
    });

    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#patientTable tbody tr").filter(function() 
            { $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    }
    ); });
});

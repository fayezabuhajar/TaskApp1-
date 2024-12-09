using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/patients")]
public class PatientsController : ControllerBase
{
    private readonly StoreContext context;

    public PatientsController(StoreContext context)
    {
        this.context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
    {
        return await context.Patients.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Patient>> GetPatientById(int id)
    {
        var patient = await context.Patients.FindAsync(id);
        if (patient == null) return NotFound();
        return patient;
    }

    [HttpPost]
    public async Task<ActionResult<Patient>> PatientInfo([FromBody] Patient patient)
    {
        context.Patients.Add(patient);
        await context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPatientById), new { id = patient.Id }, patient);
    }

  


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePatient(int id)
    {
        var patient = await context.Patients.FindAsync(id);
        if (patient == null) return NotFound();

        context.Patients.Remove(patient);
        await context.SaveChangesAsync();

        return NoContent();
    }

    
}



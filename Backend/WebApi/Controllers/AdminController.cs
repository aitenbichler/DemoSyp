using Core.Contracts;

using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

using Base.Web.Controller;

using Core.Entities;

using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

using System;
using System.Threading.Tasks;

/// <summary>
/// REST Controller for Demo
/// </summary>
[Authorize(Policy = "AdminUser")]
[ApiController]
[Route("[controller]")]
public class AdminController : ControllerBase
{
    private readonly IUnitOfWork                _uow;
    private readonly ILogger<DemoController> _logger;

    /// <summary>
    /// Constructor of AdminController.
    /// </summary>
    /// <param name="uow"></param>
    /// <param name="logger"></param>
    public AdminController(IUnitOfWork uow, ILogger<DemoController> logger)
    {
        _uow    = uow;
        _logger = logger;
    }

    /// <summary>
    /// Do something important.
    /// </summary>
    /// <returns></returns>
    [HttpPost]
    public async Task<ActionResult> DoSomethingAsync()
    {
        await Task.CompletedTask;
        return Ok();
    }
}
﻿using COMTUR.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace COMTUR.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuditoriaController : ControllerBase
    {
        private readonly ComturDBContext _context;

        public AuditoriaController(ComturDBContext context)
        {
            _context = context;
        }

        [HttpGet("ultima-modificacao/{id}/{entidade}")]
        public IActionResult GetUltimaModificacao(int id, string entidade)
        {
            var ultimaAuditoria = _context.Auditoria
                .Where(a => a.NomeEntidade == entidade && a.NovosValores.Contains($"\"Id\":{id}"))
                .OrderByDescending(a => a.Data)
                .ThenByDescending(a => a.Hora)
                .FirstOrDefault();

            if (ultimaAuditoria == null)
            {
                return NotFound("Nenhum registro de auditoria encontrado para o ID fornecido.");
            }

            var resultado = new
            {
                ultimaAuditoria.NomeEntidade,
                ultimaAuditoria.Data,
                ultimaAuditoria.Hora
            };

            return Ok(resultado);
        }

        [HttpGet("historico-modificacoes/{id}/{entidade}")]
        public IActionResult GetHistoricoModificacoes(int id, string entidade)
        {
            var auditorias = _context.Auditoria
                .Where(a => a.NomeEntidade == entidade && (a.ValoresAntigos.Contains($"\"Id\":{id}") || a.NovosValores.Contains($"\"Id\":{id}")))
                .OrderBy(a => a.Data)
                .ThenBy(a => a.Hora)
                .ToList();

            if (auditorias == null || !auditorias.Any())
            {
                return NotFound("Nenhum histórico de auditoria encontrado para o ID fornecido.");
            }

            return Ok(auditorias);
        }

    }
}
namespace Persistence;

using Core.Contracts;

using System.Threading.Tasks;

public class ImportService : IImportService
{
    private IUnitOfWork _uow;

    public ImportService(IUnitOfWork uow)
    {
        _uow = uow;
    }

    public async Task ImportDbAsync()
    {
        //TODO
        //await _uow.MDemoRepository.AddRangeAsync(mDemos);
        await _uow.SaveChangesAsync();
    }
}
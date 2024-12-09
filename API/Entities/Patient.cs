using System;

namespace API.Entities
{
    public class Patient
    {
        public int Id { get; set; }
        public required string NationalNumber { get; set; }
        public required string EnglishName { get; set; }
        public required string FirstArabicNameLName { get; set; }
        public string? SecondArabicNameTName { get; set; }
        public string? ThirdArabicNameSName { get; set; }
        public required string LastArabicNameFName { get; set; }
        public required string PhoneNumber { get; set; }
        public string? Telephone { get; set; }
        public required string PatientEmail { get; set; }
        public required string Password { get; set; }
        public required string MaritalStatus { get; set; }
        public int Discount { get; set; }
        public required string Country { get; set; }
        public int Age { get; set; }
        public DateTime DateOfBirth { get; set; }
        public required string Gender { get; set; }
        public DateTime DateRegistered { get; set; } = DateTime.Now;

        // خاصية جديدة للاسم العربي الكامل
        public string ArabicFullName
        {
            get
            {
                return $"{FirstArabicNameLName} {SecondArabicNameTName} {ThirdArabicNameSName} {LastArabicNameFName}".Trim();
            }
        }
    }
}

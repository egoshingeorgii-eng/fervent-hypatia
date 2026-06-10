import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Replace StateCard function
new_state_card = """function StateCard({ 
  name, 
  isDefault, 
  initiallyExpanded,
  holidays 
}: { 
  name: string, 
  isDefault: boolean, 
  initiallyExpanded: boolean,
  holidays: { name: string, date?: string, checked?: boolean }[]
}) {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const [showFacepileDropdown, setShowFacepileDropdown] = useState(false);
  const [internalHolidays, setInternalHolidays] = useState<{name: string, date: string}[]>([]);

  const facepileEmployees = [
    { initials: '', color: 'bg-gray-200', name: 'Employee 1' },
    { initials: '', color: 'bg-gray-200', name: 'Employee 2' },
    { initials: '', color: 'bg-gray-200', name: 'Employee 3' },
  ];

  const handleAddInternalHoliday = () => {
    setInternalHolidays([
      ...internalHolidays,
      { name: "Company Anniversary", date: "15. September" }
    ]);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm transition-all">
      <div 
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#f9fafb] border border-gray-200 flex items-center justify-center text-gray-500 shrink-0 shadow-sm">
            {isDefault ? <MapPinHouse size={20} strokeWidth={2} /> : <MapPin size={20} strokeWidth={2} />}
          </div>
          <span className="font-bold text-[16px] text-gray-900">{name}</span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Facepile */}
          <div 
            className="flex items-center relative cursor-default"
            onMouseEnter={() => setShowFacepileDropdown(true)}
            onMouseLeave={() => setShowFacepileDropdown(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {facepileEmployees.map((avatar, i) => (
              <div 
                key={i} 
                className={`w-[24px] h-[24px] rounded-full border-[2px] border-white flex items-center justify-center bg-gray-200 text-transparent text-[10px] font-medium ${i !== 0 ? '-ml-[8px]' : ''}`}
                style={{ zIndex: 10 - i }}
              />
            ))}
            
            {showFacepileDropdown && (
              <div className="absolute top-[100%] mt-2 right-0 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2">
                <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Employees
                </div>
                {facepileEmployees.map((emp, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-200 text-white text-[10px] font-medium"></div>
                    <span className="text-[13px] font-medium text-gray-700">{emp.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="text-gray-400 hover:text-gray-600 rounded-md transition-colors outline-none focus:ring-0">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-5 space-y-4 animate-in fade-in duration-200">
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {holidays.map((h, i) => (
              <HolidayRow key={i} name={h.name} date={h.date} checked={h.checked} />
            ))}
            {internalHolidays.map((holiday, idx) => (
              <HolidayRow 
                key={`internal-${idx}`} 
                name={holiday.name} 
                date={holiday.date} 
                deletable 
                hideCheckbox 
                onDelete={() => {
                  setInternalHolidays(internalHolidays.filter((_, i) => i !== idx));
                }}
              />
            ))}
          </div>

          <button 
            className="flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-blue-700 transition-colors ml-1"
            onClick={(e) => { e.stopPropagation(); handleAddInternalHoliday(); }}
          >
            <PlusCircle size={16} /> Add company-internal holidays (Germany wide)
          </button>
        </div>
      )}
    </div>
  );
}
"""

content = re.sub(r'function StateCard\(\{.*?(?=\Z|\n\n)', new_state_card, content, flags=re.DOTALL)

with open("src/App.tsx", "w") as f:
    f.write(content)
print("Done")

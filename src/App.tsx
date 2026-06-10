import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  CalendarDays, ChevronDown, Check, Clock3, Globe, MapPin, MapPinHouse, Trash2, Plus, 
  AlertTriangle, Search, PlusCircle, ChevronUp, X, Info, Users, UserPlus, Download,
  Settings2, ChevronLeft, ChevronRight, MoreHorizontal, FileText, CreditCard, FileBadge, History
} from "lucide-react";

const GERMAN_STATES = [
  "Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hesse", 
  "Lower Saxony", "Mecklenburg-Vorpommern", "North Rhine-Westphalia", "Rhineland-Palatinate", 
  "Saarland", "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia"
];

// Facepile data
const ALL_EMPLOYEES = [
  { id: '1', initials: 'MJ', color: 'bg-blue-500', name: 'Maria Jensen', jobTitle: 'HR Manager' },
  { id: '2', initials: 'SP', color: 'bg-teal-500', name: 'Stefan Petrov', jobTitle: 'Software Engineer' },
  { id: '3', initials: 'DR', color: 'bg-purple-500', name: 'Diana Richter', jobTitle: 'Product Designer' },
  { id: '4', initials: 'JD', color: 'bg-orange-500', name: 'John Doe', jobTitle: 'Sales Manager' },
  { id: '5', initials: 'AS', color: 'bg-pink-500', name: 'Anna Smith', jobTitle: 'Marketing Lead' },
  { id: '6', initials: 'TM', color: 'bg-red-500', name: 'Thomas Müller', jobTitle: 'Backend Developer' },
  { id: '7', initials: 'LW', color: 'bg-indigo-500', name: 'Laura Weber', jobTitle: 'UX Researcher' },
  { id: '8', initials: 'KF', color: 'bg-cyan-500', name: 'Kevin Fischer', jobTitle: 'DevOps Engineer' },
  { id: '9', initials: 'SW', color: 'bg-emerald-500', name: 'Sarah Wagner', jobTitle: 'Data Analyst' },
  { id: '10', initials: 'MB', color: 'bg-violet-500', name: 'Michael Becker', jobTitle: 'Engineering Manager' },
  { id: '11', initials: 'JH', color: 'bg-rose-500', name: 'Julia Hoffmann', jobTitle: 'Recruiter' },
  { id: '12', initials: 'DS', color: 'bg-amber-500', name: 'David Schäfer', jobTitle: 'Account Executive' },
  { id: '13', initials: 'NK', color: 'bg-lime-500', name: 'Nina Koch', jobTitle: 'Content Strategist' },
  { id: '14', initials: 'PB', color: 'bg-sky-500', name: 'Paul Bauer', jobTitle: 'Frontend Developer' },
  { id: '15', initials: 'LK', color: 'bg-fuchsia-500', name: 'Lisa Klein', jobTitle: 'Office Manager' },
  { id: '16', initials: 'MW', color: 'bg-stone-500', name: 'Markus Wolf', jobTitle: 'Legal Counsel' },
  { id: '17', initials: 'SN', color: 'bg-green-500', name: 'Sophie Neumann', jobTitle: 'Finance Analyst' },
  { id: '18', initials: 'CS', color: 'bg-yellow-500', name: 'Christian Schwarz', jobTitle: 'Product Manager' },
  { id: '19', initials: 'EZ', color: 'bg-zinc-500', name: 'Emma Zimmermann', jobTitle: 'QA Engineer' },
  { id: '20', initials: 'AK', color: 'bg-slate-500', name: 'Alexander Krüger', jobTitle: 'CTO' },
  { id: '21', initials: 'LH', color: 'bg-blue-400', name: 'Leon Hofmann', jobTitle: 'Support Specialist' },
  { id: '22', initials: 'MW', color: 'bg-purple-400', name: 'Mia Werner', jobTitle: 'Brand Designer' },
  { id: '23', initials: 'FL', color: 'bg-teal-400', name: 'Felix Lange', jobTitle: 'Security Engineer' },
  { id: '24', initials: 'CM', color: 'bg-orange-400', name: 'Clara Meyer', jobTitle: 'People Operations' }
];

function NavItem({ icon, label, active, badge, badgeColor = "bg-gray-200 text-gray-700", onClick }: { icon: React.ReactNode, label: string, active?: boolean, badge?: string, badgeColor?: string, onClick?: () => void }) {
  return (
    <div
      className={`flex items-center gap-3 p-2 rounded cursor-pointer text-sm font-medium ${active ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-300 text-gray-600'}`}
      onClick={onClick}
    >
      {icon}
      <span className="flex-1">{label}</span>
      {badge && <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${badgeColor}`}>{badge}</span>}
    </div>
  );
}

// EMPLOYEES DATA for People page
const PEOPLE_EMPLOYEES = [
  { id: 'p1', lastName: 'INFORMACIONE', firstName: 'GEORGII', jobTitle: 'QA', events: null, birthday: '26.08.1978', contractStart: '26.09.2025', contractEnd: null, salary: '€3,300.00', paymentComponents: ['Wage/Salary'] },
  { id: 'p2', lastName: 'Dmndd', firstName: 'Jdjd', jobTitle: null, events: null, birthday: '12.08.1993', contractStart: '26.08.2025', contractEnd: null, salary: '€7,505.00', paymentComponents: ['Wage/Salary'] },
  { id: 'p3', lastName: 'Mustaras', firstName: 'Maria', jobTitle: 'QA', events: 'Missing data', birthday: '03.12.1985', contractStart: '02.12.2030', contractEnd: null, salary: '€5,039.25', paymentComponents: ['Wage/Salary'] },
  { id: 'p4', lastName: 'test2', firstName: 'GEORGII', jobTitle: 'QA', events: null, birthday: '26.08.1947', contractStart: '26.09.2025', contractEnd: '27.09.2025', salary: '€3,890.00', paymentComponents: ['Wage/Salary'] },
  { id: 'p5', lastName: 'Muster', firstName: 'Maria', jobTitle: 'Geeeg', events: 'Missing data', birthday: '03.09.1983', contractStart: '04.06.2025', contractEnd: null, salary: '€3,000.00', paymentComponents: ['Wage/Salary'] },
  { id: 'p6', lastName: 'INFORMACIONE', firstName: 'Maria', jobTitle: 'Hager', events: null, birthday: '30.12.1972', contractStart: '20.08.2025', contractEnd: null, salary: '€3,000.00', paymentComponents: ['Wage/Salary'] },
  { id: 'p7', lastName: 'Mustorman', firstName: 'Mark', jobTitle: 'Assistentin - Textverarb...', events: 'Missing data', birthday: '09.08.2001', contractStart: '07.08.2024', contractEnd: null, salary: '€5,000.00', paymentComponents: ['Wage/Salary'] },
  { id: 'p8', lastName: 'INFORMACIONE', firstName: 'GEORGII', jobTitle: 'Aushilfe', events: 'Missing data', birthday: '31.07.1980', contractStart: '01.08.2024', contractEnd: null, salary: '€7,250.00', paymentComponents: ['Wage/Salary', 'Benefit'] },
  { id: 'p9', lastName: 'Stebert', firstName: 'Christian', jobTitle: 'Assistentin - Textverarb...', events: null, birthday: '11.12.1967', contractStart: '03.04.1997', contractEnd: '01.04.2022', salary: '€5,008.00', paymentComponents: ['Wage/Salary', 'Benefit'] },
  { id: 'p10', lastName: 'Stebert', firstName: 'Christian', jobTitle: 'Developer', events: null, birthday: '11.12.1967', contractStart: '12.10.2025', contractEnd: null, salary: '€6,657.00', paymentComponents: ['Wage/Salary'] },
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultState, setDefaultState] = useState<string | null>('Bavaria');
  const [activeStates, setActiveStates] = useState<string[]>(['Bavaria', 'Berlin']);
  const [employeeAssignments, setEmployeeAssignments] = useState<Record<string, string[]>>({});
  const [uiVariant, setUiVariant] = useState<'drawer' | 'popover'>('popover');
  const [activePage, setActivePage] = useState<'absences' | 'people'>('absences');
  const [selectedEmployee, setSelectedEmployee] = useState<typeof PEOPLE_EMPLOYEES[0] | null>(null);

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-screen bg-[#f3f4f6]">
        {/* Sidebar */}
        <aside className="w-[240px] bg-[#e5e7eb] flex flex-col h-full shrink-0">
          <div className="p-4 flex-1 overflow-y-auto space-y-1">
            <NavItem icon={<CalendarDays size={18} />} label="Absences" active={activePage === 'absences'} onClick={() => { setActivePage('absences'); setSelectedEmployee(null); }} />
            <NavItem icon={<Users size={18} />} label="People" active={activePage === 'people'} onClick={() => { setActivePage('people'); setSelectedEmployee(null); }} />
          </div>
          <div className="p-4 space-y-2 mt-auto">
            <div className="flex items-center gap-2 p-2 hover:bg-gray-300 rounded cursor-pointer mt-2 text-sm font-medium">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-[10px] text-gray-500">C</div>
              <span className="flex-1 truncate text-gray-500">Company Name</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-[#f3f4f6]">
          {activePage === 'people' && selectedEmployee ? (
            <EmployeeDetailPage employee={selectedEmployee} onBack={() => setSelectedEmployee(null)} allEmployees={PEOPLE_EMPLOYEES} />
          ) : activePage === 'people' ? (
            <PeoplePage employees={PEOPLE_EMPLOYEES} onSelectEmployee={setSelectedEmployee} />
          ) : (
          <div className="p-8 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">Absences</h1>
              <Button variant="outline" onClick={() => setIsModalOpen(true)}>Manage holidays</Button>
            </div>

          {/* Debug Panel */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] font-medium text-gray-500 uppercase tracking-wider">Debug Scenarios</p>
              <div className="flex bg-gray-100 p-0.5 rounded-md border border-gray-200">
                <button 
                  className={`px-3 py-1 text-[12px] font-medium rounded-sm transition-colors ${uiVariant === 'drawer' ? 'bg-white shadow-sm text-gray-900 border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setUiVariant('drawer')}
                >
                  Drawer UI
                </button>
                <button 
                  className={`px-3 py-1 text-[12px] font-medium rounded-sm transition-colors ${uiVariant === 'popover' ? 'bg-white shadow-sm text-gray-900 border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setUiVariant('popover')}
                >
                  Popover UI
                </button>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" className="text-orange-700 border-orange-200 bg-orange-50 hover:bg-orange-100" onClick={() => { 
                setDefaultState('Bavaria'); 
                setActiveStates(['Bavaria']); 
                setEmployeeAssignments({}); 
                setIsModalOpen(true);
              }}>1. Default State</Button>
              
              <Button variant="outline" size="sm" className="text-orange-700 border-orange-200 bg-orange-50 hover:bg-orange-100" onClick={() => { 
                setDefaultState('Bavaria'); 
                setActiveStates(['Bavaria', 'Berlin']); 
                setEmployeeAssignments({'Berlin': ['1', '2']}); 
                setIsModalOpen(true);
              }}>2. Default + Overrides</Button>

              <Button variant="outline" size="sm" className="text-orange-700 border-orange-200 bg-orange-50 hover:bg-orange-100" onClick={() => { 
                setDefaultState(null); 
                setActiveStates(['Berlin', 'Hamburg']); 
                setEmployeeAssignments({'Berlin': ['1', '2'], 'Hamburg': ['3']}); 
                setIsModalOpen(true);
              }}>3. No Default</Button>
              
              <Button variant="outline" size="sm" className="text-orange-700 border-orange-200 bg-orange-50 hover:bg-orange-100" onClick={() => { 
                setDefaultState(null); 
                setActiveStates([]); 
                setEmployeeAssignments({}); 
                setIsModalOpen(true);
              }}>4. Empty State</Button>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 bg-gray-200/50 border border-gray-200 rounded-xl p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <Clock3 size={20} />
              </div>
              <span className="text-gray-500 font-medium">No pending requests</span>
            </div>
            <div className="w-64 bg-gray-200/50 border border-gray-200 rounded-xl p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <Check size={20} />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
            
            <div className="flex gap-6 border-b border-gray-200 text-sm font-medium">
              <div className="pb-2 border-b-2 border-gray-900 text-gray-900">Overview</div>
              <div className="pb-2 text-gray-500 cursor-pointer">Pending</div>
              <div className="pb-2 text-gray-500 cursor-pointer">Approved</div>
              <div className="pb-2 text-gray-500 cursor-pointer">Declined</div>
            </div>

            <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-16 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 animate-pulse"></div>
              <div className="h-5 w-48 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          </div>
          )}
        </main>

        {/* Sheet Wrapper */}
        <ManageHolidaysSheet 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          defaultState={defaultState} 
          setDefaultState={setDefaultState} 
          activeStates={activeStates} 
          setActiveStates={setActiveStates}
          employeeAssignments={employeeAssignments}
          setEmployeeAssignments={setEmployeeAssignments}
          uiVariant={uiVariant}
        />
      </div>
    </TooltipProvider>
  );
}

// ─── People Page ──────────────────────────────────────────────────────────────
function PeoplePage({ employees, onSelectEmployee }: { employees: typeof PEOPLE_EMPLOYEES, onSelectEmployee: (emp: typeof PEOPLE_EMPLOYEES[0]) => void }) {
  const [activeTab, setActiveTab] = useState<'active' | 'awaiting' | 'archived'>('active');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = employees.filter(e =>
    `${e.firstName} ${e.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center px-6 py-4 bg-white border-b border-gray-200">
        <h1 className="text-[22px] font-bold text-gray-900">People</h1>
      </div>

      <div className="p-6 flex-1 overflow-auto">
        {/* Employees header */}
        <div className="mb-4">
          <h2 className="text-[18px] font-bold text-gray-900">Employees</h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-4">
          {(['active', 'awaiting', 'archived'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                activeTab === tab ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {tab === 'active' && <><span className="capitalize">{tab}</span><span className="bg-gray-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">10</span></>}
              {tab === 'awaiting' && <span>Awaiting start</span>}
              {tab === 'archived' && <><span className="capitalize">{tab}</span><span className="bg-gray-300 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">6</span></>}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-12">ID</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Last name</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">First name</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Job title</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Events</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Birthday</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Contract start</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Contract end</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Salary/Wage</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Payment components</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onSelectEmployee(emp)}
                >
                  <td className="px-4 py-3 text-[13px] text-gray-400">-</td>
                  <td className="px-4 py-3 text-[13px] font-medium text-gray-800">{emp.lastName}</td>
                  <td className="px-4 py-3 text-[13px] text-gray-700">{emp.firstName}</td>
                  <td className="px-4 py-3 text-[13px] text-gray-600">{emp.jobTitle || ''}</td>
                  <td className="px-4 py-3">
                    {emp.events ? (
                      <span className="inline-block px-2 py-0.5 bg-orange-100 text-orange-700 text-[11px] font-semibold rounded">{emp.events}</span>
                    ) : <span className="text-gray-400">–</span>}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-gray-600">{emp.birthday}</td>
                  <td className="px-4 py-3 text-[13px] text-gray-600">{emp.contractStart}</td>
                  <td className="px-4 py-3 text-[13px] text-gray-600">{emp.contractEnd || '—'}</td>
                  <td className="px-4 py-3 text-[13px] text-gray-700 font-medium">{emp.salary}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {emp.paymentComponents.map(c => (
                        <span key={c} className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-[11px] rounded">{c}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
            <span className="text-[12px] text-gray-500">Showing 1-10 of 10 items</span>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-400"><ChevronLeft size={14} /></button>
              <button className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-400"><ChevronLeft size={14} /></button>
              <button className="w-7 h-7 rounded bg-white border border-gray-300 text-[12px] font-semibold text-gray-800 shadow-sm">1</button>
              <button className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-400"><ChevronRight size={14} /></button>
              <button className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-400"><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Employee Detail Page ─────────────────────────────────────────────────────
function EmployeeDetailPage({ employee, onBack, allEmployees }: { employee: typeof PEOPLE_EMPLOYEES[0], onBack: () => void, allEmployees: typeof PEOPLE_EMPLOYEES }) {
  const [activeTab, setActiveTab] = useState<'masterdata' | 'employment' | 'payment' | 'documents' | 'absences'>('employment');
  const currentIndex = allEmployees.findIndex(e => e.id === employee.id);
  const total = allEmployees.length;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-100 text-[13px] text-gray-500">
        <button onClick={onBack} className="hover:text-blue-600 transition-colors font-medium">People</button>
        <span className="text-gray-300">/</span>
        <span className="text-gray-700 font-medium">{employee.firstName} {employee.lastName}</span>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1 text-[12px] text-gray-500">
            <button className="p-1 hover:bg-gray-100 rounded transition-colors"><ChevronLeft size={14} /></button>
            <span>{currentIndex + 1} of {total} (Active)</span>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors"><ChevronRight size={14} /></button>
          </div>
          <span className="text-[13px] font-medium text-gray-700">December 2025</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Main content */}
        <div className="flex-1 overflow-auto">
          {/* Employee header */}
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-[14px] font-bold text-gray-600">
                  {employee.firstName[0]}{employee.lastName[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-[18px] font-bold text-gray-900">{employee.firstName} {employee.lastName}</h1>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors"><Settings2 size={14} /></button>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-md hover:bg-gray-100">
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 mt-5 border-b border-gray-200">
              {[
                { key: 'masterdata', label: 'Master data' },
                { key: 'employment', label: 'Employment', badge: '2' },
                { key: 'payment', label: 'Payment' },
                { key: 'documents', label: 'Documents' },
                { key: 'absences', label: 'Absences' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`flex items-center gap-1.5 pb-3 text-[14px] font-medium transition-colors border-b-2 -mb-[1px] ${
                    activeTab === tab.key
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                  {tab.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      activeTab === tab.key ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}>{tab.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          {activeTab === 'employment' && (
            <div className="px-6 py-5">
              {/* Employment details card */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-[14px] font-semibold text-gray-700">
                  <FileText size={16} className="text-gray-400" />
                  Employment details
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 bg-red-50 hover:bg-red-100 text-[12px] font-semibold h-8">
                    Terminate contract
                  </Button>
                  <Button size="sm" variant="outline" className="text-[12px] font-semibold h-8 flex items-center gap-1.5">
                    <FileBadge size={13} /> Edit
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-16 gap-y-5">
                <FieldGroup label="Job title" value={employee.jobTitle || '—'} />
                <FieldGroup label="Contract Type" value="Unlimited full-time contract" />
                <FieldGroup label="Employment Type" value="Minijob" />
                <FieldGroup label="Personnel number" value="—" />
                <FieldGroup label="Employee exempt from pension insurance" value="No" />
                <div />
                <FieldGroup label="Contract start" value={employee.contractStart} />
                <div />
                <FieldGroup label="Trial period" value="No" />
                <div />
                <FieldGroup label="Contractual workdays" value="Tuesday Total: 4.00 hours" />
                <FieldGroup label="Contractual Vacation days (per year)" value="20" />
                <FieldGroup label="Additional Payments" value="No" />
                <FieldGroup label="Remaining vacation days in current year" value="20.5" />
                <FieldGroup label="Do you have additional employments?" value="This is the only employment" />
                <div />
                <FieldGroup label="Is the place of work (federal state) different from the company's location?" value="No" />
                <div />
                <FieldGroup label="Cost center" value="—" />
                <FieldGroup label="Cost unit" value="—" />
                <FieldGroup label="Comment field (employee)" value="—" />
                <FieldGroup label="Comment field (HR-admin)" value="—" />
                <FieldGroup label="Payment type" value="Bank transfer" />
                <div />
              </div>

              <button className="mt-6 flex items-center gap-1.5 text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                <Plus size={14} className="text-blue-600" /> Create a new contract
              </button>
            </div>
          )}

          {activeTab === 'masterdata' && (
            <div className="px-6 py-5 text-[14px] text-gray-500 italic">Master data content...</div>
          )}
          {activeTab === 'payment' && (
            <div className="px-6 py-5 text-[14px] text-gray-500 italic">Payment content...</div>
          )}
          {activeTab === 'documents' && (
            <div className="px-6 py-5 text-[14px] text-gray-500 italic">Documents content...</div>
          )}
          {activeTab === 'absences' && (
            <div className="px-6 py-5 space-y-4">

              {/* Card: Vacation entitlement */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                      <CalendarDays size={18} strokeWidth={2} />
                    </div>
                    <span className="text-[15px] font-semibold text-gray-900">Vacation entitlement</span>
                  </div>
                  <Button size="sm" variant="outline" className="text-[12px] font-semibold h-8 flex items-center gap-1.5 text-gray-600">
                    <FileBadge size={13} /> Edit
                  </Button>
                </div>
                <div className="px-5 py-4 grid grid-cols-2 gap-x-16 gap-y-5">
                  <FieldGroup label="Contractual vacation days (per year)" value="20" />
                  <FieldGroup label="Remaining vacation days in current year" value="20.5" />
                  <FieldGroup label="Vacation days carried over" value="0.5" />
                  <FieldGroup label="Vacation calculation method" value="By contract" />
                </div>
              </div>

              {/* Card: Absence overview */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                      <Clock3 size={18} strokeWidth={2} />
                    </div>
                    <span className="text-[15px] font-semibold text-gray-900">Absence overview</span>
                  </div>
                  <Button size="sm" variant="outline" className="text-[12px] font-semibold h-8 flex items-center gap-1.5 text-gray-600">
                    <FileBadge size={13} /> Edit
                  </Button>
                </div>
                <div className="px-5 py-4 grid grid-cols-2 gap-x-16 gap-y-5">
                  <FieldGroup label="Sick days this year" value="0" />
                  <FieldGroup label="Sick days last year" value="0" />
                  <FieldGroup label="Unpaid leave days this year" value="0" />
                  <FieldGroup label="Parental leave" value="No" />
                  <FieldGroup label="Maternity protection" value="No" />
                  <FieldGroup label="Other absences" value="—" />
                </div>
              </div>

              {/* Card: Public holidays */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                      <Globe size={18} strokeWidth={2} />
                    </div>
                    <span className="text-[15px] font-semibold text-gray-900">Public holidays</span>
                  </div>
                  <Button size="sm" variant="outline" className="text-[12px] font-semibold h-8 flex items-center gap-1.5 text-gray-600">
                    <FileBadge size={13} /> Edit
                  </Button>
                </div>
                <div className="px-5 py-4 grid grid-cols-2 gap-x-16 gap-y-5">
                  <FieldGroup label="Work location (federal state)" value="Bavaria" />
                  <FieldGroup label="Public holiday schedule" value="Bavaria – 13 holidays" />
                  <FieldGroup label="Assignment method" value="Default (company-wide)" />
                  <FieldGroup label="Effective from" value={employee.contractStart} />
                </div>
              </div>

            </div>
          )}
        </div>


      </div>
    </div>
  );
}

function FieldGroup({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[12px] text-gray-500 mb-1">{label}</p>
      <p className="text-[14px] font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function EmployeesPopover({ 
  stateName,
  selectedEmployees,
  onToggleEmployee,
  employeeAssignments,
  defaultState,
  children 
}: { 
  stateName: string;
  selectedEmployees: string[];
  onToggleEmployee: (empId: string) => void;
  employeeAssignments: Record<string, string[]>;
  defaultState: string | null;
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [initialSortOrder, setInitialSortOrder] = useState<string[]>([]);
  const [popoverSnapshot, setPopoverSnapshot] = useState<{
    employeeAssignments: Record<string, string[]>;
    defaultState: string | null;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPopoverSnapshot({ employeeAssignments, defaultState });
      const getCat = (emp: typeof ALL_EMPLOYEES[0]) => {
        const explicitState = Object.keys(employeeAssignments).find(s => s !== '__unassigned__' && employeeAssignments[s]?.includes(emp.id));
        const isUnassigned = employeeAssignments['__unassigned__']?.includes(emp.id);
        const currentState = explicitState || (isUnassigned ? null : defaultState);
        
        if (!currentState) return 0; // пустые
        if (selectedEmployees.includes(emp.id)) return 1; // подходящие под state
        return 2; // остальные
      };

      const order = [...ALL_EMPLOYEES].sort((a, b) => {
        const catA = getCat(a);
        const catB = getCat(b);
        if (catA !== catB) return catA - catB;
        return a.name.localeCompare(b.name);
      }).map(e => e.id);

      setInitialSortOrder(order);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const filteredEmployees = ALL_EMPLOYEES.filter(emp => emp.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (initialSortOrder.length > 0) {
      return initialSortOrder.indexOf(a.id) - initialSortOrder.indexOf(b.id);
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        className="w-[320px] p-0 shadow-xl border-gray-200 z-[100]" 
        align="end"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 border-b border-gray-100 bg-gray-50 rounded-t-md">
          <div className="text-[14px] font-semibold text-gray-900 mb-2 px-1">Assign to {stateName}</div>
          <div className="flex items-center px-3 py-2 border border-gray-200 rounded-md bg-white focus-within:border-blue-500 transition-colors shadow-sm">
            <Search size={14} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search employees..." 
              className="flex-1 outline-none text-[13px] bg-transparent text-gray-900 placeholder:text-gray-400"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div 
          style={{ maxHeight: '320px', overflowY: 'auto' }}
          onWheel={(e) => e.stopPropagation()}
          className="py-1"
        >
          {sortedEmployees.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500 text-[13px]">No employees found</div>
          )}
          {sortedEmployees.map((emp) => {
            const isSelected = selectedEmployees.includes(emp.id);
            const explicitState = Object.keys(employeeAssignments).find(s => s !== '__unassigned__' && employeeAssignments[s]?.includes(emp.id));
            const isUnassigned = employeeAssignments['__unassigned__']?.includes(emp.id);
            const currentState = explicitState || (isUnassigned ? null : defaultState);
            const isAssignedElsewhere = currentState && currentState !== stateName && !isSelected;
            return (
              <div
                key={emp.id}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onToggleEmployee(emp.id)}
              >
                <Checkbox checked={isSelected} className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 rounded-[4px] pointer-events-none" />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-gray-800 truncate">{emp.name}</div>
                  <div className="text-[11px] text-gray-400 truncate">{emp.jobTitle}</div>
                </div>
                {isSelected ? (
                  (() => {
                    if (!popoverSnapshot) return null;
                    const snapAssignments = popoverSnapshot.employeeAssignments;
                    const snapDefault = popoverSnapshot.defaultState;
                    const initialExplicitState = Object.keys(snapAssignments).find(s => s !== '__unassigned__' && snapAssignments[s]?.includes(emp.id));
                    const isInitialUnassigned = snapAssignments['__unassigned__']?.includes(emp.id);
                    const initialState = initialExplicitState || (isInitialUnassigned ? null : snapDefault);
                    if (initialState && initialState !== stateName) {
                      return (
                        <div className="flex items-center px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded shrink-0 text-[11px] font-medium">
                          {stateName}
                        </div>
                      );
                    }
                    return null;
                  })()
                ) : isAssignedElsewhere ? (
                  <span className="text-[11px] text-gray-500 font-medium px-1.5 py-0.5 bg-gray-100 rounded shrink-0">{currentState}</span>
                ) : null}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ManageHolidaysSheet({ 
  isOpen, onClose, defaultState, setDefaultState, activeStates, setActiveStates, 
  employeeAssignments, setEmployeeAssignments, uiVariant 
}: { 
  isOpen: boolean, onClose: () => void, defaultState: string | null, setDefaultState: (state: string | null) => void, 
  activeStates: string[], setActiveStates: (states: string[]) => void,
  employeeAssignments: Record<string, string[]>, setEmployeeAssignments: (assignments: Record<string, string[]>) => void,
  uiVariant: 'drawer' | 'popover'
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [mainSnapshot, setMainSnapshot] = useState<{
    defaultState: string | null;
    activeStates: string[];
    employeeAssignments: Record<string, string[]>;
  } | null>(null);

  const [originalDefaultState, setOriginalDefaultState] = useState(defaultState);

  useEffect(() => {
    if (isOpen) {
      setMainSnapshot({ defaultState, activeStates, employeeAssignments });
      setOriginalDefaultState(defaultState);
    }
  }, [isOpen]);

  const handleMainCancel = () => {
    if (mainSnapshot) {
      setDefaultState(mainSnapshot.defaultState);
      setActiveStates(mainSnapshot.activeStates);
      setEmployeeAssignments(mainSnapshot.employeeAssignments);
    }
    onClose();
  };

  const [isDefaultDropdownOpen, setIsDefaultDropdownOpen] = useState(false);
  const [defaultSearchQuery, setDefaultSearchQuery] = useState("");
  const defaultDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (defaultDropdownRef.current && !defaultDropdownRef.current.contains(event.target as Node)) {
        setIsDefaultDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectState = (stateName: string) => {
    if (!activeStates.includes(stateName)) {
      setActiveStates([...activeStates, stateName]);
    }
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  const handleSelectDefault = (stateName: string) => {
    const oldDefault = defaultState;
    setDefaultState(stateName);

    let newActiveStates = [...activeStates];

    // Remove old default state if it has no explicit employee assignments
    if (oldDefault && oldDefault !== stateName) {
      const hasExplicitAssignments = (employeeAssignments[oldDefault] || []).length > 0;
      if (!hasExplicitAssignments) {
        newActiveStates = newActiveStates.filter(s => s !== oldDefault);
      }
    }

    // Add new default state if not already in list
    if (!newActiveStates.includes(stateName)) {
      newActiveStates = [...newActiveStates, stateName];
    }

    setActiveStates(newActiveStates);
    setIsDefaultDropdownOpen(false);
    setDefaultSearchQuery("");
  };

  const toggleEmployee = (stateName: string, empId: string) => {
    let oldState: string | null = null;
    for (const s of Object.keys(employeeAssignments)) {
      if (employeeAssignments[s]?.includes(empId)) {
        oldState = s;
        break;
      }
    }

    const currentAssigned = employeeAssignments[stateName] || [];
    const isCurrentlyAssigned = currentAssigned.includes(empId);
    const isDefault = stateName === defaultState;
    const isVisuallyAssigned = isCurrentlyAssigned || (isDefault && oldState !== '__unassigned__' && !oldState);

    const newAssignments = { ...employeeAssignments };
    const newActiveStates = [...activeStates];

    if (isVisuallyAssigned) {
      if (isCurrentlyAssigned) {
        newAssignments[stateName] = currentAssigned.filter(id => id !== empId);
        // showAlert(`Removed ${empName} from ${stateName}`);
      }
      
      if (isDefault) {
        newAssignments['__unassigned__'] = [...(newAssignments['__unassigned__'] || []), empId];
      }
    } else {
      if (oldState) {
        newAssignments[oldState] = newAssignments[oldState].filter(id => id !== empId);
        // showAlert(`Moved ${empName} from ${oldState} to ${stateName}`);
      }
      newAssignments[stateName] = [...currentAssigned, empId];
    }

    setEmployeeAssignments(newAssignments);
    setActiveStates(newActiveStates);
  };

  const filteredStates = GERMAN_STATES.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredDefaultStates = GERMAN_STATES.filter(s => s.toLowerCase().includes(defaultSearchQuery.toLowerCase()));

  const getMockHolidays = (stateName: string) => {
    const holidays: Record<string, { name: string; date: string; checked: boolean }[]> = {
      'Baden-Württemberg': [
        { name: "Heilige Drei Könige", date: "6 Jan", checked: true },
        { name: "Fronleichnam", date: "4 Jun", checked: true },
        { name: "Allerheiligen", date: "1 Nov", checked: true },
      ],
      'Bavaria': [
        { name: "Heilige Drei Könige", date: "6 Jan", checked: true },
        { name: "Fronleichnam", date: "4 Jun", checked: true },
        { name: "Mariä Himmelfahrt", date: "15 Aug", checked: true },
        { name: "Allerheiligen", date: "1 Nov", checked: true },
      ],
      'Berlin': [
        { name: "Internationaler Frauentag", date: "8 Mar", checked: true },
      ],
      'Brandenburg': [
        { name: "Reformationstag", date: "31 Oct", checked: true },
      ],
      'Bremen': [
        { name: "Reformationstag", date: "31 Oct", checked: true },
      ],
      'Hamburg': [
        { name: "Reformationstag", date: "31 Oct", checked: true },
      ],
      'Hesse': [
        { name: "Fronleichnam", date: "4 Jun", checked: true },
      ],
      'Lower Saxony': [
        { name: "Reformationstag", date: "31 Oct", checked: true },
      ],
      'Mecklenburg-Vorpommern': [
        { name: "Reformationstag", date: "31 Oct", checked: true },
      ],
      'North Rhine-Westphalia': [
        { name: "Fronleichnam", date: "4 Jun", checked: true },
        { name: "Allerheiligen", date: "1 Nov", checked: true },
      ],
      'Rhineland-Palatinate': [
        { name: "Fronleichnam", date: "4 Jun", checked: true },
        { name: "Allerheiligen", date: "1 Nov", checked: true },
      ],
      'Saarland': [
        { name: "Fronleichnam", date: "4 Jun", checked: true },
        { name: "Mariä Himmelfahrt", date: "15 Aug", checked: true },
        { name: "Allerheiligen", date: "1 Nov", checked: true },
      ],
      'Saxony': [
        { name: "Reformationstag", date: "31 Oct", checked: true },
        { name: "Buß- und Bettag", date: "18 Nov", checked: true },
      ],
      'Saxony-Anhalt': [
        { name: "Heilige Drei Könige", date: "6 Jan", checked: true },
        { name: "Reformationstag", date: "31 Oct", checked: true },
      ],
      'Schleswig-Holstein': [
        { name: "Reformationstag", date: "31 Oct", checked: true },
      ],
      'Thuringia': [
        { name: "Weltkindertag", date: "20 Sep", checked: true },
        { name: "Reformationstag", date: "31 Oct", checked: true },
      ],
    };
    return holidays[stateName] ?? [
      { name: "Reformationstag", date: "31 Oct", checked: true },
    ];
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-[600px] sm:max-w-[600px] mt-0 h-screen rounded-none p-0 border-l border-gray-200 bg-[#f9fafb] shadow-2xl [&>button]:hidden flex flex-col overflow-hidden">
          {/* Header */}
          <SheetHeader className="px-6 py-5 border-b border-gray-200 text-left bg-white z-20 shadow-sm shrink-0">
            <SheetTitle className="text-[20px] font-bold text-gray-900 mb-1 leading-tight">Manage holidays</SheetTitle>
          {defaultState && (
            <div className="flex items-center gap-1.5 text-[14px] text-gray-500 font-medium" ref={defaultDropdownRef}>
              <span>Default work location:</span>
              <div 
                className="flex items-center gap-1 cursor-pointer hover:text-gray-800 transition-colors relative"
                onClick={() => setIsDefaultDropdownOpen(!isDefaultDropdownOpen)}
              >
                <span className="text-gray-700">{defaultState}</span>
                <ChevronDown size={16} className="text-gray-500" />
                
                {isDefaultDropdownOpen && (
                  <div className="absolute top-[100%] mt-2 left-0 w-[240px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden flex flex-col max-h-[300px]" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center px-3 py-2.5 border-b border-gray-100 shrink-0">
                      <Search size={16} className="text-gray-400 mr-2" />
                      <input 
                        type="text" 
                        placeholder="Search state" 
                        className="flex-1 outline-none text-[14px] text-gray-700 placeholder:text-gray-400"
                        value={defaultSearchQuery}
                        onChange={e => setDefaultSearchQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="overflow-y-auto py-1">
                      {filteredDefaultStates.map(state => (
                        <div 
                          key={state}
                          className="px-4 py-2 text-[14px] text-gray-900 hover:bg-gray-100 cursor-pointer transition-colors"
                          onClick={() => handleSelectDefault(state)}
                        >
                          {state}
                        </div>
                      ))}
                      {filteredDefaultStates.length === 0 && (
                        <div className="px-4 py-3 text-[14px] text-gray-500 text-center">No states found</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <SheetClose className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-md transition-colors outline-none focus:ring-0">
            <X size={20} />
            <span className="sr-only">Close</span>
          </SheetClose>
          </SheetHeader>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
          
          {!defaultState && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 relative" ref={defaultDropdownRef}>
              <div className="mt-0.5 text-amber-500 shrink-0">
                <AlertTriangle size={18} strokeWidth={2} />
              </div>
              <div className="text-[14px] text-amber-800 flex-1">
                Employees without a default work location won't receive public holidays.
                <div className="relative mt-3">
                  <button
                    className="flex items-center gap-2 text-[14px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    onClick={() => setIsDefaultDropdownOpen(!isDefaultDropdownOpen)}
                  >
                    Select state
                  </button>
                  {isDefaultDropdownOpen && (
                    <div className="absolute top-[100%] mt-2 left-0 w-[240px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden flex flex-col max-h-[300px]" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center px-3 py-2.5 border-b border-gray-100 shrink-0">
                        <Search size={16} className="text-gray-400 mr-2" />
                        <input
                          type="text"
                          placeholder="Search state"
                          className="flex-1 outline-none text-[14px] text-gray-700 placeholder:text-gray-400"
                          value={defaultSearchQuery}
                          onChange={e => setDefaultSearchQuery(e.target.value)}
                          autoFocus
                        />
                      </div>
                      <div className="overflow-y-auto py-1">
                        {filteredDefaultStates.map(state => (
                          <div
                            key={state}
                            className="px-4 py-2 text-[14px] text-gray-900 hover:bg-gray-100 cursor-pointer transition-colors"
                            onClick={() => handleSelectDefault(state)}
                          >
                            {state}
                          </div>
                        ))}
                        {filteredDefaultStates.length === 0 && (
                          <div className="px-4 py-3 text-[14px] text-gray-500 text-center">No states found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 1: National holidays */}
          <NationalCard />

          {/* SECTION 2: State holidays */}
          <section className="space-y-4">
            <div className="space-y-4 relative" ref={dropdownRef}>
              {[...activeStates].sort((a, b) => {
                if (a === defaultState) return -1;
                if (b === defaultState) return 1;
                return 0;
              }).map(stateName => {
                const isDefault = defaultState === stateName;
                const explicitEmployees = employeeAssignments[stateName] || [];
                const implicitEmployees = ALL_EMPLOYEES.filter(emp => !Object.values(employeeAssignments).some(list => list.includes(emp.id))).map(e => e.id);
                const effectiveEmployees = isDefault 
                  ? Array.from(new Set([...explicitEmployees, ...implicitEmployees])).filter(id => !(employeeAssignments['__unassigned__'] || []).includes(id))
                  : explicitEmployees;

                return (
                  <StateCard 
                    key={stateName}
                    name={stateName} 
                    isDefault={isDefault} 
                    initiallyExpanded={activeStates.length === 1 || isDefault}
                    holidays={getMockHolidays(stateName)}
                    selectedEmployees={effectiveEmployees}
                    onToggleEmployee={(empId) => toggleEmployee(stateName, empId)}
                    employeeAssignments={employeeAssignments}
                    setEmployeeAssignments={setEmployeeAssignments}
                    activeStates={activeStates}
                    setActiveStates={setActiveStates}
                    defaultState={defaultState}
                    uiVariant={uiVariant}
                  />
                );
              })}

              {activeStates.length > 0 && (
                <>
                  <div className="pt-2">
                    <button 
                      className="flex items-center gap-2 text-[14px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <Plus size={16} /> Add state
                    </button>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute top-[100%] mt-2 left-0 w-[320px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden flex flex-col max-h-[300px]">
                      <div className="flex items-center px-3 py-2.5 border-b border-gray-100 shrink-0">
                        <Search size={16} className="text-gray-400 mr-2" />
                        <input 
                          type="text" 
                          placeholder="State name" 
                          className="flex-1 outline-none text-[15px] text-gray-700 placeholder:text-gray-400"
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          autoFocus
                        />
                      </div>
                      <div className="overflow-y-auto py-1">
                        {filteredStates.map(state => (
                          <div 
                            key={state}
                            className="px-4 py-2 text-[15px] text-gray-900 hover:bg-gray-100 cursor-pointer transition-colors"
                            onClick={() => handleSelectState(state)}
                          >
                            {state}
                          </div>
                        ))}
                        {filteredStates.length === 0 && (
                          <div className="px-4 py-3 text-[14px] text-gray-500 text-center">No states found</div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-white p-6 flex flex-col gap-4 mt-auto shrink-0 z-10 relative">
          {defaultState !== originalDefaultState && defaultState !== null && (
            <div className="bg-blue-50 text-blue-800 text-[13px] px-4 py-3 rounded-lg border border-blue-100 flex items-start gap-2.5 animate-in fade-in duration-300">
               <Info size={16} className="text-blue-500 mt-[2px] shrink-0" />
               <p className="leading-relaxed">
                 <span className="font-semibold">
                   {ALL_EMPLOYEES.filter(emp => !Object.values(employeeAssignments).some(list => list.includes(emp.id))).length} employees
                 </span> will switch to {defaultState} holidays. <span className="font-semibold">
                   {ALL_EMPLOYEES.length - ALL_EMPLOYEES.filter(emp => !Object.values(employeeAssignments).some(list => list.includes(emp.id))).length} {ALL_EMPLOYEES.length - ALL_EMPLOYEES.filter(emp => !Object.values(employeeAssignments).some(list => list.includes(emp.id))).length === 1 ? 'employee' : 'employees'}
                 </span> with specific locations won't be affected.
               </p>
            </div>
          )}
          <div className="flex gap-4 justify-end">
            <Button variant="outline" className="text-[14px] font-semibold border-gray-300 text-gray-700 hover:bg-gray-50 h-[42px]" onClick={handleMainCancel}>Cancel</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[14px] h-[42px] shadow-sm" onClick={onClose}>Save</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function NationalCard() {
  const [expanded, setExpanded] = useState(false);
  const [internalHolidays, setInternalHolidays] = useState<{name: string, date?: string}[]>([]);

  const handleAddInternalHoliday = () => {
    setInternalHolidays([
      ...internalHolidays,
      { name: "Company Anniversary", date: "1 Sep" }
    ]);
  };
  
  const allHolidays = [
    { name: "Example 1", date: "1 Jan", checked: true },
    { name: "Example 2", date: "2 Jan", checked: true },
    { name: "Example 3", date: "3 Jan", checked: true }
  ];
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm transition-all">
      <div 
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
            <Globe size={20} strokeWidth={2} />
          </div>
          <span className="font-bold text-[16px] text-gray-900">9 national holidays</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-[14px] text-gray-500 hidden sm:inline-block">Applies to all employees</span>
          <button className="text-gray-400 hover:text-gray-600 rounded-md transition-colors outline-none focus:ring-0">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-5 space-y-4 animate-in fade-in duration-200">
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {allHolidays.map((h, i) => (
              <HolidayRow key={`nat-${i}`} name={h.name} date={h.date} checked={h.checked} />
            ))}
          </div>

          {internalHolidays.length > 0 && (
            <div className="pt-2">
              <h4 className="text-[15px] font-semibold text-[#475569] mb-3">Company internal</h4>
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                {internalHolidays.map((holiday, idx) => (
                  <HolidayRow 
                    key={`internal-${idx}`} 
                    name={holiday.name} 
                    date={holiday.date} 
                    deletable 
                    checked={true}
                    onDelete={() => {
                      setInternalHolidays(internalHolidays.filter((_, i) => i !== idx));
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <button 
            className="flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-blue-700 transition-colors ml-1"
            onClick={(e) => { e.stopPropagation(); handleAddInternalHoliday(); }}
          >
            <PlusCircle size={16} /> Add company-internal holidays
          </button>
        </div>
      )}
    </div>
  );
}

function HolidayRow({ name, date, checked, deletable, hideCheckbox, onDelete }: { name: string, date?: string, checked?: boolean, deletable?: boolean, hideCheckbox?: boolean, onDelete?: () => void }) {
  return (
    <div className="group flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        {!hideCheckbox && <Checkbox id={name} checked={checked} className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 rounded-[4px]" />}
        <label htmlFor={name} className={`text-[14px] font-medium text-gray-900 ${hideCheckbox ? '' : 'cursor-pointer'}`}>{name}</label>
      </div>
      <div className="flex items-center gap-3">
        {date && <span className="text-[13px] text-gray-400">{date}</span>}
        {deletable && (
          <button 
            className="text-gray-400 hover:text-red-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
          >
            <Trash2 size={15} />
          </button>
        )}
      </div>
    </div>
  );
}

function StateCard({ 
  name, 
  isDefault, 
  initiallyExpanded,
  holidays,
  selectedEmployees,
  onToggleEmployee,
  employeeAssignments,
  setEmployeeAssignments,
  activeStates,
  setActiveStates,
  defaultState,
  uiVariant,
}: { 
  name: string, 
  isDefault: boolean, 
  initiallyExpanded: boolean,
  holidays: { name: string, date?: string, checked?: boolean }[],
  selectedEmployees: string[],
  onToggleEmployee: (empId: string) => void,
  employeeAssignments: Record<string, string[]>,
  setEmployeeAssignments: (assignments: Record<string, string[]>) => void,
  activeStates: string[],
  setActiveStates: (states: string[]) => void,
  defaultState: string | null,
  uiVariant: 'drawer' | 'popover'
}) {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const [isEmployeeDrawerOpen, setIsEmployeeDrawerOpen] = useState(false);
  const [employeeSearchQuery, setEmployeeSearchQuery] = useState('');
  
  const [drawerSnapshot, setDrawerSnapshot] = useState<{
    employeeAssignments: Record<string, string[]>;
    activeStates: string[];
    defaultState: string | null;
  } | null>(null);

  const handleOpenDrawer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDrawerSnapshot({ employeeAssignments, activeStates, defaultState });
    setIsEmployeeDrawerOpen(true);
  };

  const handleCancelDrawer = () => {
    if (drawerSnapshot) {
      setEmployeeAssignments(drawerSnapshot.employeeAssignments);
      setActiveStates(drawerSnapshot.activeStates);
    }
    setIsEmployeeDrawerOpen(false);
  };
  
  const [initialSortOrder, setInitialSortOrder] = useState<string[]>([]);

  useEffect(() => {
    if (isEmployeeDrawerOpen) {
      const getCat = (emp: typeof ALL_EMPLOYEES[0]) => {
        const explicitState = Object.keys(employeeAssignments).find(s => s !== '__unassigned__' && employeeAssignments[s]?.includes(emp.id));
        const isUnassigned = employeeAssignments['__unassigned__']?.includes(emp.id);
        const currentState = explicitState || (isUnassigned ? null : defaultState);
        
        if (!currentState) return 0; // пустые
        if (selectedEmployees.includes(emp.id)) return 1; // подходящие под state
        return 2; // остальные
      };

      const order = [...ALL_EMPLOYEES].sort((a, b) => {
        const catA = getCat(a);
        const catB = getCat(b);
        if (catA !== catB) return catA - catB;
        return a.name.localeCompare(b.name);
      }).map(e => e.id);

      setInitialSortOrder(order);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmployeeDrawerOpen]);

  const filteredEmployees = ALL_EMPLOYEES.filter(emp => emp.name.toLowerCase().includes(employeeSearchQuery.toLowerCase()));
  
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (initialSortOrder.length > 0) {
      return initialSortOrder.indexOf(a.id) - initialSortOrder.indexOf(b.id);
    }
    return a.name.localeCompare(b.name);
  });

  const handleToggleEmployeeForPopover = (empId: string) => {
    // We capture the snapshot on first interaction if needed, or simply toggle.
    // The Drawer uses a snapshot to show visual changes (e.g. "Bavaria -> Baden"), 
    // but the Popover is simpler and just toggles immediately.
    onToggleEmployee(empId);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm transition-all">
      <div 
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
            {isDefault ? <MapPinHouse size={20} strokeWidth={2} /> : <MapPin size={20} strokeWidth={2} />}
          </div>
          <span className="font-bold text-[16px] text-gray-900">{name}</span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Facepile / Employee Selector */}
            {uiVariant === 'drawer' ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className="flex items-center relative cursor-pointer px-1.5 py-1 -mr-1.5 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={handleOpenDrawer}
                  >
                    {selectedEmployees.length === 0 ? (
                      <div className="flex items-center gap-1.5 text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        <Plus size={14} /> Add employees
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {selectedEmployees.slice(0, 3).map((empId, i) => {
                          const emp = ALL_EMPLOYEES.find(e => e.id === empId);
                          if (!emp) return null;
                          return (
                            <div 
                              key={emp.id} 
                              className={`w-[24px] h-[24px] rounded-full border-[2px] border-white flex items-center justify-center text-white text-[10px] font-medium ${emp.color} ${i !== 0 ? '-ml-[8px]' : ''}`}
                              style={{ zIndex: 10 - i }}
                            >
                              {emp.initials}
                            </div>
                          );
                        })}
                        {selectedEmployees.length > 3 && (
                          <div 
                            className="w-[24px] h-[24px] rounded-full border-[2px] border-white bg-gray-100 flex items-center justify-center text-gray-600 text-[10px] font-medium -ml-[8px]"
                            style={{ zIndex: 0 }}
                          >
                            +{selectedEmployees.length - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                {selectedEmployees.length > 0 ? (
                  <TooltipContent className="bg-gray-900 text-white border-gray-800 text-[13px] py-2 px-3 shadow-xl max-w-[220px]">
                    <div className="font-medium mb-1 text-gray-100">Assigned employees:</div>
                    <div className="text-gray-300 space-y-0.5 mb-1.5 max-h-[120px] overflow-y-auto pr-1">
                      {selectedEmployees.map(id => {
                        const emp = ALL_EMPLOYEES.find(e => e.id === id);
                        return <div key={id} className="truncate leading-tight py-0.5">{emp?.name}</div>;
                      })}
                    </div>
                    <div className="text-gray-400 text-[11px] italic border-t border-gray-700 pt-1.5 mt-1">Click to easily change everything!</div>
                  </TooltipContent>
                ) : (
                  <TooltipContent className="bg-gray-900 text-white border-gray-800 text-[13px] py-2 px-3 shadow-xl">
                    <p>Click to assign employees</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ) : (
              <EmployeesPopover 
                stateName={name}
                selectedEmployees={selectedEmployees}
                onToggleEmployee={handleToggleEmployeeForPopover}
                employeeAssignments={employeeAssignments}
                defaultState={defaultState}
              >
                  <div 
                    className="flex items-center relative cursor-pointer px-1.5 py-1 -mr-1.5 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {selectedEmployees.length === 0 ? (
                      <div className="flex items-center gap-1.5 text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        <Plus size={14} /> Add employees
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {selectedEmployees.slice(0, 3).map((empId, i) => {
                          const emp = ALL_EMPLOYEES.find(e => e.id === empId);
                          if (!emp) return null;
                          return (
                            <div 
                              key={emp.id} 
                              className={`w-[24px] h-[24px] rounded-full border-[2px] border-white flex items-center justify-center text-white text-[10px] font-medium ${emp.color} ${i !== 0 ? '-ml-[8px]' : ''}`}
                              style={{ zIndex: 10 - i }}
                            >
                              {emp.initials}
                            </div>
                          );
                        })}
                        {selectedEmployees.length > 3 && (
                          <div className="w-[24px] h-[24px] rounded-full border-[2px] border-white bg-gray-100 flex items-center justify-center text-gray-500 text-[10px] font-medium -ml-[8px] z-0">
                            +{selectedEmployees.length - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
              </EmployeesPopover>
            )}

          <button className="text-gray-400 hover:text-gray-600 rounded-md transition-colors outline-none focus:ring-0">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-5 animate-in fade-in duration-200 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          {holidays.map((h, i) => (
            <HolidayRow key={i} name={h.name} date={h.date} checked={h.checked} />
          ))}
        </div>
      )}

      <Sheet open={isEmployeeDrawerOpen} onOpenChange={(open) => !open && handleCancelDrawer()} modal={false}>
        <SheetContent usePortal={false} hideOverlay className="w-[600px] sm:max-w-[600px] mt-0 h-screen rounded-none p-0 border-l border-gray-200 bg-[#f9fafb] shadow-2xl z-[100] [&>button]:hidden flex flex-col overflow-hidden">
            <SheetHeader className="px-6 py-5 border-b border-gray-200 text-left bg-white z-20 shadow-sm shrink-0">
              <SheetTitle className="text-[18px] font-bold text-gray-900 mb-1 leading-tight">Employees</SheetTitle>
            <div className="mt-4 flex items-center px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus-within:bg-white focus-within:border-blue-500 transition-colors">
              <Search size={16} className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search employees..." 
                className="flex-1 outline-none text-[14px] bg-transparent text-gray-900 placeholder:text-gray-400"
                value={employeeSearchQuery}
                onChange={e => setEmployeeSearchQuery(e.target.value)}
              />
            </div>
            <SheetClose className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-md transition-colors outline-none focus:ring-0">
              <X size={20} />
            </SheetClose>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6 min-h-0">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {sortedEmployees.map((emp) => {
                const isSelected = selectedEmployees.includes(emp.id);
                const explicitState = Object.keys(employeeAssignments).find(s => s !== '__unassigned__' && employeeAssignments[s]?.includes(emp.id));
                const isUnassigned = employeeAssignments['__unassigned__']?.includes(emp.id);
                const currentState = explicitState || (isUnassigned ? null : defaultState);

                return (
                  <div 
                    key={emp.id} 
                    className="group flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-medium ${emp.color} shrink-0`}>
                      {emp.initials}
                    </div>
                    <div className="flex flex-col flex-1 truncate">
                      <span className="text-[14px] font-medium text-gray-700">{emp.name}</span>
                    </div>
                    
                    <div className="shrink-0 flex items-center" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className={`text-[12px] font-medium px-2 py-1.5 rounded-md transition-colors outline-none flex items-center gap-1.5 ${isSelected ? (drawerSnapshot && (() => {
                            const snapAssignments = drawerSnapshot.employeeAssignments;
                            const snapDefault = drawerSnapshot.defaultState;
                            const initialExplicitState = Object.keys(snapAssignments).find(s => s !== '__unassigned__' && snapAssignments[s]?.includes(emp.id));
                            const isInitialUnassigned = snapAssignments['__unassigned__']?.includes(emp.id);
                            const initialState = initialExplicitState || (isInitialUnassigned ? null : snapDefault);
                            return initialState && initialState !== name;
                          })() ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200') : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            {isSelected ? (
                              (() => {
                                if (!drawerSnapshot) return name;
                                const snapAssignments = drawerSnapshot.employeeAssignments;
                                const snapDefault = drawerSnapshot.defaultState;
                                const initialExplicitState = Object.keys(snapAssignments).find(s => s !== '__unassigned__' && snapAssignments[s]?.includes(emp.id));
                                const isInitialUnassigned = snapAssignments['__unassigned__']?.includes(emp.id);
                                const initialState = initialExplicitState || (isInitialUnassigned ? null : snapDefault);
                                if (initialState && initialState !== name) {
                                  return (
                                    <>
                                      <span className="line-through opacity-70">{initialState}</span>
                                      <span>→</span>
                                      <span>{name}</span>
                                    </>
                                  );
                                }
                                return name;
                              })()
                            ) : (
                              currentState || "Unassigned"
                            )}
                            <ChevronDown size={14} className="opacity-50 ml-0.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px] max-h-[300px] overflow-y-auto">
                          <DropdownMenuItem 
                            onClick={() => {
                              const newAssignments = { ...employeeAssignments };
                              const newActiveStates = [...activeStates];
                              for (const s of Object.keys(newAssignments)) {
                                if (newAssignments[s]) newAssignments[s] = newAssignments[s].filter(id => id !== emp.id);
                              }
                              newAssignments['__unassigned__'] = [...(newAssignments['__unassigned__'] || []), emp.id];
                              setEmployeeAssignments(newAssignments);
                              setActiveStates(newActiveStates);
                            }}
                          >
                            Unassigned
                          </DropdownMenuItem>
                          {activeStates.map(state => (
                            <DropdownMenuItem 
                              key={state}
                              onClick={() => {
                                const newAssignments = { ...employeeAssignments };
                                const newActiveStates = [...activeStates];
                                for (const s of Object.keys(newAssignments)) {
                                  if (newAssignments[s]) newAssignments[s] = newAssignments[s].filter(id => id !== emp.id);
                                }
                                if (state !== defaultState) {
                                  if (!newAssignments[state]) newAssignments[state] = [];
                                  newAssignments[state].push(emp.id);
                                  if (!newActiveStates.includes(state)) newActiveStates.push(state);
                                }
                                setEmployeeAssignments(newAssignments);
                                setActiveStates(newActiveStates);
                              }}
                            >
                              {state}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border-t border-gray-200 bg-white p-6 flex gap-4 justify-end mt-auto shrink-0 z-10 relative">
            <Button variant="outline" className="text-[14px] font-semibold border-gray-300 text-gray-700 hover:bg-gray-50 h-[42px]" onClick={handleCancelDrawer}>Cancel</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[14px] h-[42px] shadow-sm" onClick={() => setIsEmployeeDrawerOpen(false)}>Save</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

import { Link } from 'react-router-dom'
import type { NavSection } from './navConfig'

interface MegaMenuProps {
  panel?: { title: string; description: string }
  sections: NavSection[]
  onClose: () => void
}

export default function MegaMenu({ panel, sections, onClose }: MegaMenuProps) {
  return (
    <div className="absolute left-0 right-0 bg-white border-b border-gray-100 shadow-sm animate-fade-in">
      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-12">
        {panel && (
          <div className="w-56 shrink-0 pt-1">
            <p className="text-sm font-semibold text-gray-900 mb-2">{panel.title}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{panel.description}</p>
          </div>
        )}

        {panel && <div className="w-px bg-gray-100 shrink-0 my-1" />}

        <div className="flex gap-10 flex-1">
          {sections.map((section, i) => (
            <div key={i} className="w-52 shrink-0">
              {section.title && (
                <p className="text-xs font-semibold text-brand uppercase tracking-wider mb-3 opacity-70">
                  {section.title}
                </p>
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <Link
                        to={item.href}
                        onClick={onClose}
                        className="group flex flex-col rounded-md px-3 py-2"
                      >
                        <span className="flex items-center gap-0 group-hover:gap-2 transition-all duration-200">
                          <span className="w-0 h-px bg-brand opacity-0 group-hover:w-3 group-hover:opacity-100 transition-all duration-200 shrink-0" />
                          <span className="text-sm font-medium text-gray-800 group-hover:text-brand transition-colors duration-200">
                            {item.label}
                          </span>
                        </span>
                        {item.description && (
                          <span className="text-xs text-gray-400 mt-0.5 group-hover:text-gray-500 transition-colors pl-0 group-hover:pl-5 duration-200">
                            {item.description}
                          </span>
                        )}
                      </Link>
                    ) : (
                      <div className="flex flex-col rounded-md px-3 py-2 cursor-default opacity-50">
                        <span className="text-sm font-medium text-gray-800">{item.label}</span>
                        {item.description && (
                          <span className="text-xs text-gray-400 mt-0.5">{item.description}</span>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
